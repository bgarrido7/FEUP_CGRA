/**
* MyPyramid
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene, tetayy, velocity, x,y,z ) {
        super(scene);
        this.tetayy = tetayy;
        this.velocity = velocity;
        this.xpos = x;
        this.ypos = y;
        this.zpos = z;
		this.tanterior=0;
		
		this.xposi = 0;
		this.zposi = 0;
       

        this.cube = new MyUnitCubeQuad(this.scene);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.triangle = new MyTriangle(this.scene);
        this.quad = new MyQuad(this.scene);

        this.quad.initBuffers();    
        this.cube.initBuffers();    
        this.pyramid.initBuffers();
        this.triangle.initBuffers();

		this.bico = new CGFappearance(this.scene);
        this.bico.setAmbient(253/255, 196/255, 39/255, 1);
        this.bico.setDiffuse(253/255, 196/255, 39/255, 1);
        this.bico.setSpecular(253/255, 196/255, 39/255, 1);
        this.bico.setShininess(10.0);

		this.penas = new CGFappearance(this.scene);
        this.penas.setAmbient(51/255, 1, 1, 1);
        this.penas.setDiffuse(51/255, 1, 1, 1);
        this.penas.setSpecular(51/255, 1, 1, 1);
        this.penas.setShininess(10.0);

        this.penas_corpo = new CGFappearance(this.scene);
        this.penas_corpo.setAmbient(0.1, 0.1, 0.1, 1);
        this.penas_corpo.setDiffuse(0.9, 0.9, 0.9, 1);
        this.penas_corpo.setSpecular(0.1, 0.1, 0.1, 1);
        this.penas_corpo.setShininess(10.0);
        this.penas_corpo.loadTexture('images/penas.jpg');
        this.penas_corpo.setTextureWrap('REPEAT', 'REPEAT');

        this.olhos = new CGFappearance(this.scene);
        this.olhos.setAmbient(64/255, 64/255, 64/255, 1);
        this.olhos.setDiffuse(64/255, 64/255, 64/255, 1);
        this.olhos.setSpecular(64/255, 64/255, 64/255, 1);
        this.olhos.setShininess(10.0);

		//this.update(this.scene.t);
    }

    accelerate(v){
		if (v)  
			this.velocity++;
		
		else 
			this.velocity--;
		
		if (this.velocity > 5){
			this.velocity = 5;
		}
		else if (this.velocity < -3){
			this.velocity = -3;
		}
		
    }

    turn(v){
		if (v) 
			this.tetayy = this.tetayy + Math.PI/10;
		
		else 
			this.tetayy = this.tetayy - Math.PI/10;

    }

    update(t) {	

		this.dt=this.scene.t-this.tanterior;

		this.tanterior = this.scene.t;

		

		this.xposi = this.xpos + Math.cos(this.tetayy)*this.velocity*this.dt;
		
		this.zposi = this.zpos - Math.sin(this.tetayy)*this.velocity*this.dt;
		
		this.xpos = this.xposi;
		this.zpos = this.zposi;
		
		if (this.xpos > 90)
			this.xpos = 90;
		else if (this.xpos < -90)
			this.xpos = -90;
		
		if (this.zpos > 90)
			this.zpos = 90;
		else if (this.zpos < -90)
			this.zpos = -90;
			
	}

	display() {
		
		this.update(this.scene.t);
					
		this.scene.pushMatrix();
		//mover passaro
			this.scene.translate(this.xpos,this.ypos,this.zpos);
			this.scene.rotate(this.tetayy, 0, 1, 0);
			this.scene.translate(0, 5+ Math.sin(this.scene.t)*0.5, 0);
			//corpo 
				this.scene.pushMatrix();
					this.scene.translate(0.7,3,0);
					this.scene.scale(3,3,3);
				//	this.penas_corpo.apply();
					this.penas.apply();
					this.cube.display();
				this.scene.popMatrix();


				//cabeça
				this.scene.pushMatrix();
					this.scene.translate(2.5,6,0);
					this.scene.scale(3,3,3);
					this.penas.apply();
					this.cube.display();
				this.scene.popMatrix();

			//bico
			this.scene.pushMatrix();
				this.scene.translate(4,5.2,0);
					this.scene.rotate(-Math.PI/2, 0, 0, 1);
					this.scene.scale(0.7,0.7,0.7);
					this.bico.apply();
					this.pyramid.display();
				this.scene.popMatrix();

				//olhos
				this.scene.pushMatrix();
					this.scene.translate(3.2,6.2,1.5);
					this.scene.scale(0.7,0.7,0.7);
					this.olhos.apply();
					this.cube.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.translate(3.2,6.2,-1.5);
					this.scene.scale(0.7,0.7,0.7);
					this.olhos.apply();
					this.cube.display();
				this.scene.popMatrix();

				//cauda
				this.scene.pushMatrix();
					this.scene.translate(-0.5,2.8,0);
					this.scene.rotate(-Math.PI, 0, 0, 1);
					this.scene.rotate(-Math.PI, 1, 0, 0);
					this.scene.scale(0.5,0.5,0.5);
					this.penas.apply();
					this.triangle.display();
				this.scene.popMatrix();

			//asas 

				this.scene.pushMatrix();

					this.scene.rotate(-Math.sin(this.scene.t+Math.PI/6)*0.25 ,1,0,0);
					this.scene.rotate(Math.PI/8 ,1,0,0);
					this.scene.translate(0, -0.8, -1);

					this.scene.pushMatrix();
						this.scene.translate(1, 4, 2);
						this.scene.rotate(-Math.PI/1.7, 1, 0, 0);
						this.scene.scale(1.5,3,1);
						this.penas.apply();
						this.quad.display();
					this.scene.popMatrix();

					this.scene.pushMatrix();
						this.scene.translate(0.25, 4.4, 3.4);
						this.scene.rotate(Math.PI/1.5, 1, 0, 0);
						this.scene.scale(0.5, 0.6, 1);
						this.penas.apply();
						this.triangle.display();
					this.scene.popMatrix();

				this.scene.popMatrix();


				this.scene.pushMatrix();
				
					this.scene.rotate(Math.sin(this.scene.t+Math.PI/6)*0.25 ,1,0,0);
					this.scene.rotate(-Math.PI/8 ,1,0,0);
					this.scene.translate(0, -0.8, 1);

					this.scene.pushMatrix();
					this.scene.translate(1,4,-2);
						this.scene.rotate(Math.PI/1.7,1,0,0);
						this.scene.scale(1.5,3,1);
						this.penas.apply();
						this.quad.display();
					this.scene.popMatrix();

					this.scene.pushMatrix();
						this.scene.translate(0.25, 4.4, -3.4);
						this.scene.rotate(-Math.PI/1.5,1,0,0);
						this.scene.scale(0.5,0.6,1);
						this.penas.apply();
						this.triangle.display();
					this.scene.popMatrix();

				this.scene.popMatrix();

			this.scene.popMatrix();
		}

}


