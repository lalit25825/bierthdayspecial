document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const scene = document.querySelector('.scene');
    const girl = document.querySelector('.girl');
    const boy = document.querySelector('.boy');
    const firecracker = document.querySelector('.firecracker');
    const fireworkTrail = document.querySelector('.firework-trail');
    const fireworkExplosion = document.querySelector('.firework-explosion');
    const message = document.querySelector('.message');
    const firefliesContainer = document.querySelector('.fireflies');
    const fireworkSound = document.getElementById('firework-sound');
    
    // Create trees
    const treesContainer = document.querySelector('.trees');
    const treePositions = [5, 25, 65, 85];
    treePositions.forEach(pos => {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.left = `${pos}%`;
        if (pos === 25) tree.style.transform = 'scale(1.1)';
        if (pos === 65) tree.style.transform = 'scale(0.9)';
        if (pos === 85) tree.style.transform = 'scale(0.8)';
        treesContainer.appendChild(tree);
    });
    
    // Create fireflies
    for (let i = 0; i < 12; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = `${Math.random() * 80 + 10}%`;
        firefly.style.top = `${Math.random() * 60 + 20}%`;
        firefly.style.animationDelay = `${Math.random() * 6}s`;
        firefly.style.opacity = Math.random() * 0.6 + 0.4;
        firefliesContainer.appendChild(firefly);
    }
    
    let step = 0;
    
    // Click handler for animation sequence
    document.addEventListener('click', () => {
        step++;
        
        if (step === 1) {
            // Boy enters
            boy.style.opacity = '1';
            boy.style.left = '25%';
            
        } else if (step === 2) {
            // Girl lights firecracker
            firecracker.style.opacity = '1';
            firecracker.style.bottom = '38%';
            
        } else if (step === 3) {
            // Firecracker launches
            firecracker.style.bottom = '100vh';
            
            // Show firework trail
            fireworkTrail.style.opacity = '1';
            fireworkTrail.style.height = '65%';
            fireworkTrail.style.bottom = '35%';
            fireworkTrail.style.transition = 'height 3.5s cubic-bezier(0.1, 0, 0.2, 1)';
            
            // Camera follows upward
            scene.style.transform = 'translateZ(-600px) rotateX(10deg)';
            
            // Launch firework
            setTimeout(() => {
                fireworkExplosion.style.opacity = '1';
                fireworkExplosion.style.top = '2%';
                fireworkExplosion.style.left = '50%';
                fireworkExplosion.style.width = '10px';
                fireworkExplosion.style.height = '10px';
                fireworkExplosion.style.transition = 'all 0.5s ease-out';
                
                // Play firework sound
                fireworkSound.currentTime = 0;
                fireworkSound.play();
                
                // Explosion
                setTimeout(() => {
                    fireworkExplosion.style.width = '300px';
                    fireworkExplosion.style.height = '300px';
                    fireworkExplosion.style.opacity = '0.8';
                    fireworkExplosion.style.background = 'radial-gradient(circle, white 0%, gold 30%, transparent 70%)';
                    
                    // Create sparks
                    for (let i = 0; i < 80; i++) {
                        setTimeout(() => {
                            const spark = document.createElement('div');
                            spark.className = 'spark';
                            spark.style.left = '50%';
                            spark.style.top = '2%';
                            spark.style.opacity = '1';
                            spark.style.transform = `translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px)`;
                            spark.style.transition = `all ${Math.random() * 1.5 + 0.5}s ease-out`;
                            spark.style.width = `${Math.random() * 5 + 2}px`;
                            spark.style.height = spark.style.width;
                            spark.style.background = `radial-gradient(circle, white 0%, hsl(${Math.random() * 60 + 30}, 100%, 50%) 50%, transparent 80%)`;
                            scene.appendChild(spark);
                            
                            setTimeout(() => {
                                spark.style.opacity = '0';
                                setTimeout(() => spark.remove(), 1000);
                            }, 200);
                        }, i * 30);
                    }
                    
                    // Show message
                    setTimeout(() => {
                        message.style.opacity = '1';
                        message.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 800);
                    
                    // Reset view
                    setTimeout(() => {
                        scene.style.transform = 'translateZ(0) rotateX(0)';
                        fireworkTrail.style.opacity = '0';
                        fireworkTrail.style.height = '0';
                    }, 2500);
                    
                }, 3500);
            }, 50);
        }
    });
});