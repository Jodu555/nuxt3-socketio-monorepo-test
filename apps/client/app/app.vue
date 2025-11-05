<template>
	<div>
		<Connection />
		<button @click="onClick">Click me ({{ count }})</button>
	</div>
</template>

<script setup lang="ts">
import Connection from './components/Connection.client.vue';

const count = ref(0);

const socket = useSocket();

onMounted(() => {
	console.log('App mounted');
	socket.on('addClick', (data) => {
		count.value = data.count;
	});
});

onBeforeUnmount(() => {
	console.log('App unmounted');
	socket.off('addClick');
});

function onClick() {
	count.value++;
	socket.emit('clicked', { count: count.value });
}
</script>
