<script>
	import Images from './images.svelte';
	import img from '../assets/drikkelek.png';

	const imgs = [{ src: img, alt: 'Trikkelek side 1' }];
</script>

<Images title="Trikkelek" {imgs} />
