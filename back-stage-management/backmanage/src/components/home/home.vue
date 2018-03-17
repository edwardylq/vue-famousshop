<template>
	<div class="box">
		<div class="liheader">
			<lheader></lheader>
		</div>
		<div class="libody">
			<div class="linav">
				<lnav></lnav>
			</div>
			<div class="limain">
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