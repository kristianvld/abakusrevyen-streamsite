<script>
	import Images from './images.svelte';

	import prog1 from '../assets/program/1.png';
	import prog2 from '../assets/program/2.png';
	import prog3 from '../assets/program/3.png';
	import prog4 from '../assets/program/4.png';
	import prog5 from '../assets/program/5.png';

	const imgs = [
		{ src: prog1, alt: 'Program side 1' },
		{ src: prog2, alt: 'Program side 2' },
		{ src: prog3, alt: 'Program side 3' },
		{ src: prog4, alt: 'Program side 4' },
		{ src: prog5, alt: 'Program side 5' },
	];
</script>

<Images title="Program" {imgs} />
