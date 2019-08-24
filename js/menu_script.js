window.onload = function() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	let canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	let renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 0, 1000);

	let light = new THREE.AmbientLight(0xFFFFFF);
	scene.add(light);

	let geometry = new THREE.SphereGeometry(400, 20, 20);

	let material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, vertexColors: THREE.FaceColors});

	for(let i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}

	let ball = new THREE.Mesh(geometry, material);
	scene.add(ball);

	function animate() {
		ball.rotation.y += 0.0005;

		renderer.render(scene, camera);
		requestAnimationFrame(function() {animate();});
	}

	animate();
}
