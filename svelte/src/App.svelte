<script>
  let items = [
    { id: 1, name: "Milk", done: false },
    { id: 2, name: "Bread", done: true },
    { id: 3, name: "Eggs", done: false }
	];
	
	const remove = item => {
		items = items.filter(i => i !== item);
	};

	let name = '';

	const addItem = () => {
		items = [
			...items,
			{ id: Math.random(), name, done: false }
		];
		name = '';
	};
</script>

<style>
	li button {
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
	}

	button {
		float: right;
		border: none;
		color: #dc4f21;
		font-size: 18px;
		cursor: pointer;
	}

	.done span {
		opacity: 0.4;
	}

	.title {
		color: #333;
		max-width: 300px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}

	h1 {
		line-height: 1.2;
		letter-spacing: -.1rem;
		margin-bottom: 2rem;;
		font-weight: 400;
	}

	label {
		display: block;
		text-transform: uppercase;
		font-size: 0.8em;
		color: #777;
		margin-bottom: .5rem;
		font-weight: 600;
	}

	ul {
		list-style: none;
	}

	li {
		text-transform: capitalize;
		list-style: none;
		padding: 6px 10px;
		border-bottom: 1px solid #ddd;
	}
</style>
<h1 class="title">Grocery List 🗒️</h1>
<div>
	<form on:submit|preventDefault={addItem}>
		<label for="name">Add an item</label>
		<input id="name" type="text" bind:value={name} />
	</form>
	<ul>
	{#each items as item}
		<li class:done={item.done}>
			<input type="checkbox" bind:checked={item.done}>
			<span>{item.name}</span>
			<button on:click={() => remove(item)}>❌</button>
		</li>
		{/each}
	</ul>
</div>
