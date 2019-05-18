/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
		super();
	
		
		
    }
    init(application) {
				super.init(application);
				this.initCameras();
				this.initLights();
				this.initMaterials();
				this.wireframe = false;
				this.showShaderCode = true;	
				
				//movimentos do bixo
				this.xpos=14;
				this.ypos=20;
				this.zpos=0;
				this.velocity=0;
				this.tetayy=0;
				this.count = false;
				this.turnVar = false;

				//Background color
				this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

				this.gl.clearDepth(100.0);
				this.gl.enable(this.gl.DEPTH_TEST);
				this.gl.enable(this.gl.CULL_FACE);
				this.gl.depthFunc(this.gl.LEQUAL);
				
				this.enableTextures(true);
				this.setUpdatePeriod(50);

				//Initialize scene objects
				this.Cube = new MyCubeMap(this);
				this.axis = new CGFaxis(this);
				this.plane = new Plane(this, 32);


				this.shadersDiv = document.getElementById("shaders");
				this.vShaderDiv = document.getElementById("vshader");
				this.fShaderDiv = document.getElementById("fshader");

				this.house = new MyHouse(this);
				this.bird = new MyBird(this, this.tetayy, this.velocity, this.xpos, this.ypos, this.zpos);
				this.terrain = new MyTerrain(this);        

				this.nest = new MyPrism(this, 10, 1, 1);
				//this.nest.initBuffers();


				this.appearance = new CGFappearance(this);
				this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
				this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
				this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
				this.appearance.setShininess(120);


				this.bird_nest = new CGFappearance(this);
				this.bird_nest.setAmbient(0.1, 0.1, 0.1, 1);
				this.bird_nest.setDiffuse(0.9, 0.9, 0.9, 1);
				this.bird_nest.setSpecular(0.1, 0.1, 0.1, 1);
				this.bird_nest.setShininess(10.0);
				this.bird_nest.loadTexture('images/birdNest.jpg');
				this.bird_nest.setTextureWrap('REPEAT', 'REPEAT');
			
				this.tanterior=0;
			
					
    }
	
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
	
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    initMaterials(){
        this.sky = new CGFappearance(this);
        this.sky.setAmbient(1, 1, 1, 1);
        this.sky.setDiffuse(0, 0, 0, 1);
        this.sky.setSpecular(0, 0, 0, 1);
		this.sky.setShininess(10.0);
		this.sky.loadTexture('skybox/sky2.jpg');
        this.sky.setTextureWrap('REPEAT', 'REPEAT');

		
    }
	// updates the selected object's wireframe mode
	onWireframeChanged(v) {
		if (v)
			this.terrain.plane.setLineMode();
		else
			this.terrain.plane.setFillMode();

	}
	
	update(t) {
		this.checkKeys();
		this.t = t/ 200;
	
		

	}
	

/*------------para controlar animação------*/
	checkKeys(){
		var text="Keys pressed: ";
		var keysPressed=false;
		
		// Check for key codes e.g. in ​https://keycode.info/
		if (this.gui.isKeyPressed("KeyW")) {
			text+=" W ";
			this.count = true;
			this.bird.accelerate(this.count);
			keysPressed=true;
		}
		
		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			this.count = false;
			this.bird.accelerate(this.count);
			keysPressed=true;
		}
		
		if (this.gui.isKeyPressed("KeyA")) {
			text+=" A ";
			this.turnVar = true;
			this.bird.turn(this.turnVar);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD")) {
			text+=" D ";
			this.turnVar = false;
			this.bird.turn(this.turnVar);
			keysPressed=true;
		}

		if (keysPressed)
			console.log(text);
	}
	

	setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
		
		 
        // Draw axis
        this.axis.display();

		

        //Apply default appearance
        this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
        
		this.terrain.display(); 

		this.pushMatrix();
			this.sky.apply();
			this.scale(100,100,100);
			this.Cube.display();
		this.popMatrix();

	//--------house with bird nest---------------
	
		this.pushMatrix();
		
			//this.translate(7,5,0);
			this.scale(0.2, 0.2, 0.2);

			this.pushMatrix();
				this.scale(7, 7, 7);
				this.house.display();
			this.popMatrix();

			this.pushMatrix();
				//this.translate(7, 10,0);
				this.scale(0.5, 0.5, 0.5);
				this.bird.display();
			this.popMatrix();
			
			this.pushMatrix();
				this.translate(7,10,0);
				this.scale(2, 1.5, 2);
				this.bird_nest.apply();
				this.nest.display();
			this.popMatrix();

		this.popMatrix();

    //--------------------------------------------------
		
		
    }
}