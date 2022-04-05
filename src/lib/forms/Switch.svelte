<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value;

  // スイッチのトグル
	let onToggleChanged = () => {
		value = !value;
	};
</script>

<template lang='pug'>
	label.block
		+if('schema.label')
			div {schema.label}
		input.switch.mr12(type='checkbox' bind='{value}' on:click='{onToggleChanged}' class:checked='{value}')
</template>

<style lang='less' global>
	// switch
	input.switch[type=checkbox] {
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		position: relative;  
		width: 51px;
		height: 31px;
		border-radius: 9999px;
		overflow: hidden;
		background: #C5C5C5;
		transition: 200ms;
		&:after {
			content: "";
			position: absolute;
			top: 2px;
			left: 2px;
			width: 27px;
			height: 27px;
			background: white;
			display: block;
			border-radius: 9999px;
			transition: 200ms;
		}
		&.checked {
			background: rgb(52, 122, 183);
			border-color: transparent !important;
			&:after {
				left: 22px;
			}
		}
	}
</style>
