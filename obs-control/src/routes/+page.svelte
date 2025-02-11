<script>
	import { onMount } from 'svelte';
	import { scenes } from '../stores/scenesStore';
	import { logs } from '../stores/logsStore';
	import { obsStatus } from '../stores/statusStore';

	let currentRecordingFilename = '';
	let isRecording = false;
	let sceneName = '';
	let socket;

	const fetchLogging = () => {
		socket = new WebSocket('ws://localhost:8080');

		socket.onopen = () => {
			console.log('Connected to WebSocket server');
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.type === 'obs-event') {
				logs.update((logs) => [...logs, `OBS Event: ${JSON.stringify(message.updateType)}`]);
				// Handle specific events if needed
				if (message.updateType === 'CurrentProgramSceneChanged') {
					obsStatus.set(`Switched to scene: ${message.sceneName}`);
				} else if (message.updateType === 'RecordStateChanged') {
					if (message.outputActive) {
						obsStatus.set('Recording...');
					} else {
						obsStatus.set(`Recording stopped. Output file : ${message.outputPath}`);
					}
				} else {
					obsStatus.set(`OBS live event : ${message.updateType}`);
				}
			} else {
				logs.update((logs) => [...logs, message.message]);
			}
		};

		socket.onclose = () => {
			console.log('Disconnected from WebSocket server');
		};
	};

	onMount(() => {
		fetchLogging();
		fetchFilename();
		fetchScenes();

		return () => {
			if (socket) {
				socket.close();
			}
		};
	});

	async function startRecording() {
		isRecording = true;
		await fetch('http://localhost:8080/obs/start-recording', { method: 'POST' });
	}

	async function stopRecording() {
		isRecording = false;
		await fetch('http://localhost:8080/obs/stop-recording', { method: 'POST' });
	}

	async function switchScene() {
		await fetch('http://localhost:8080/obs/switch-scene', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sceneName })
		});
	}

	async function fetchFilename() {
		const res = await fetch('http://localhost:8080/obs/current-filename');
		const data = await res.json();
		currentRecordingFilename = data;
	}

	async function fetchScenes() {
		const res = await fetch('http://localhost:8080/obs/scenes');
		const data = await res.json();
		scenes.set(data);
	}
</script>

<div class="grid h-screen place-items-center bg-gray-100">
	<div class="rounded-4xl bg-slate-900 shadow-2xl">
		<div class="m-4 flex items-center justify-center gap-6 p-8">
			<img src="/obslogo.svg" alt="Logo" />
			<h1 class="text-5xl font-black">OBS Control</h1>
		</div>

		<div class="rounded-b-4xl grid grid-cols-2 gap-4 bg-slate-800 p-6">
			<div
				class="rounded-4xl col-span-2 flex flex-col items-center justify-center gap-6 bg-slate-900 p-8"
			>
				<h3 class="text-2xl font-black">Current Status</h3>
				<p>{$obsStatus}</p>
			</div>
			<div
				class="rounded-4xl m-auto flex h-full flex-col items-center justify-center gap-6 bg-slate-900 p-8"
			>
				<h3 class="text-2xl font-black">{isRecording ? 'Stop Recording' : 'Start Recording'}</h3>
				{#if isRecording}
					<button on:click={stopRecording} class="rounded-full hover:bg-slate-700">
						<img src="/stop.svg" alt="stop" />
					</button>
				{:else}
					<button on:click={startRecording} class="rounded-full bg-slate-800 hover:bg-slate-700">
						<img src="/play.svg" alt="play" />
					</button>
				{/if}
			</div>

			<div class="flex flex-col gap-4">
				<div
					class="rounded-4xl flex h-full w-full flex-col items-center justify-center gap-6 bg-slate-900 p-8"
				>
					<h3 class="text-2xl font-black">Current recording filename</h3>
					<p>{isRecording ? currentRecordingFilename : 'No active recording yet.'}</p>
				</div>
				<div
					class="rounded-4xl flex w-full flex-col items-center justify-center gap-6 bg-slate-900 p-8"
				>
					<label for="scenes-dropdown" class="text-xl font-bold">Select Scene:</label>
					<select
						id="scenes-dropdown"
						bind:value={sceneName}
						on:change={switchScene}
						class="w-full rounded bg-slate-700 p-2"
					>
						{#each $scenes as scene}
							<option value={scene.sceneName}>{scene.sceneName}</option>
						{/each}
					</select>
				</div>
			</div>

			<div
				class="rounded-4xl col-span-2 flex flex-col items-center justify-center gap-6 bg-slate-900 p-8"
			>
				<h3 class="text-2xl font-black">Logs</h3>
				<textarea
					rows="2"
					class="w-full resize-none rounded-2xl bg-slate-700 p-4"
					readonly
					value={$logs.join('\n')}
				></textarea>
			</div>
		</div>
	</div>
</div>
