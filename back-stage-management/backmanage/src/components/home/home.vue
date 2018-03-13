<template>
	<div class="box">
		<div class="header">
			<lheader></lheader>
		</div>
		<div class="body">
			<div class="nav">
				<lnav></lnav>
			</div>
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import './home.scss';
	import lheader from './header/header.vue';
	import lnav from './nav/nav.vue';
	export default{
		components:{
			lheader,
			lnav
		}
	}
</script>