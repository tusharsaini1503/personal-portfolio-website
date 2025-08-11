
        // Admin password (you can change this)
        const ADMIN_PASSWORD = "tushar123";
        let isAdminLoggedIn = false;

        // Initialize animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            createRoboticBackground();
            initWelcomeAnimation();
            initNavigation();
            initScrollEffects();
            initContactModal();
            initAdminPanel();
            initFooterInteractions();
        });

        // Footer Interactions
        function initFooterInteractions() {
            // Footer contact button
            document.getElementById('footerContactBtn').addEventListener('click', () => {
                document.getElementById('contactModal').style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            // Contact from section button
            document.getElementById('contactFromSection').addEventListener('click', () => {
                document.getElementById('contactModal').style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }

        function showService(service) {
            const services = {
                web: "I create responsive, modern websites using HTML5, CSS3, and JavaScript. From simple landing pages to complex web applications, I ensure your online presence stands out.",
                backend: "Developing robust server-side applications with Python and Java. I build scalable APIs and backend systems that power your applications efficiently.",
                database: "Designing and optimizing MySQL databases for maximum performance. I create efficient database schemas that grow with your business needs.",
                automation: "Building Python tools to automate repetitive tasks and streamline workflows. Save time and reduce errors with custom automation solutions.",
                consulting: "Providing technical guidance and strategic advice for your digital projects. From architecture planning to technology stack selection."
            };
            
            showNotification(services[service] || "Service information coming soon!", "info");
        }

        function showModal(type) {
            const content = {
                privacy: "This portfolio website respects your privacy. We don't collect personal data without your consent. Contact form submissions are processed securely.",
                terms: "By using this website, you agree to use it for legitimate purposes only. All content is the intellectual property of Tushar Saini.",
                disclaimer: "This portfolio showcases personal projects and skills. While every effort is made to ensure accuracy, no warranties are provided for the information presented."
            };
            
            alert(content[type] || "Information coming soon!");
        }

        // Admin Panel Functions
        function initAdminPanel() {
            const adminToggle = document.getElementById('adminToggle');
            const adminContent = document.getElementById('adminContent');
            
            adminToggle.addEventListener('click', () => {
                adminContent.classList.toggle('show');
            });

            // Close admin panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.admin-panel')) {
                    adminContent.classList.remove('show');
                }
            });
        }

        function checkAdminPassword() {
            const passwordInput = document.getElementById('adminPassword');
            const password = passwordInput.value;
            
            if (password === ADMIN_PASSWORD) {
                isAdminLoggedIn = true;
                document.getElementById('adminLogin').style.display = 'none';
                document.getElementById('messagesContainer').style.display = 'block';
                passwordInput.value = '';
                
                // Show success message
                showNotification("Admin access granted!", "success");
            } else {
                showNotification("Incorrect password!", "error");
                passwordInput.value = '';
            }
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: bold;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
                font-size: 0.9rem;
                line-height: 1.4;
                ${type === 'success' ? 'background: #00ff41; color: #000;' : 
                  type === 'error' ? 'background: #ff4444;' : 
                  'background: #0099ff;'}
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }

        function clearAllMessages() {
            if (confirm('Are you sure you want to clear all messages?')) {
                document.getElementById('messagesList').innerHTML = '';
                showNotification("All messages cleared!", "success");
            }
        }

        // Contact Modal Functions
        function initContactModal() {
            const contactBtn = document.getElementById('contactBtn');
            const modal = document.getElementById('contactModal');
            const closeBtn = document.getElementById('closeBtn');
            const form = document.getElementById('contactForm');

            contactBtn.addEventListener('click', () => {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('userName').value;
                const email = document.getElementById('userEmail').value;
                const phone = document.getElementById('userPhone').value;
                const message = document.getElementById('userMessage').value;
                
                // Store message (in real app, this would be sent to server)
                addMessage(name, email, phone, message);
                
                alert('Thank you for your message! I\'ll get back to you soon.');
                form.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        function addMessage(name, email, phone, message) {
            // Only add message if admin is logged in (for display purposes)
            if (isAdminLoggedIn) {
                const messagesList = document.getElementById('messagesList');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message-item';
                messageDiv.innerHTML = `
                    <div class="message-header">
                        <strong>${name}</strong>
                        <span class="message-time">${new Date().toLocaleString()}</span>
                        <button onclick="deleteMessage(this)" class="delete-btn">×</button>
                    </div>
                    <div class="message-contact">
                        Email: ${email} | Phone: ${phone}
                    </div>
                    <div class="message-content">${message}</div>
                `;
                messagesList.appendChild(messageDiv);
            }
            
            // In a real application, you would send this data to your server
            console.log('Message received:', { name, email, phone, message, timestamp: new Date() });
        }

        function deleteMessage(button) {
            if (confirm('Delete this message?')) {
                button.closest('.message-item').remove();
                showNotification("Message deleted!", "success");
            }
        }

        // Welcome Animation
        function initWelcomeAnimation() {
            const welcomeText = "I am TUSHAR SAINI. Welcome to my digital universe.";
            const textElement = document.getElementById('welcomeText');
            const animationContainer = document.getElementById('welcomeAnimation');
            
            let i = 0;
            const typeWriter = () => {
                if (i < welcomeText.length) {
                    textElement.textContent += welcomeText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        animationContainer.style.opacity = '0';
                        setTimeout(() => {
                            animationContainer.style.display = 'none';
                        }, 1000);
                    }, 2000);
                }
            };
            
            setTimeout(() => {
                animationContainer.style.opacity = '1';
                typeWriter();
            }, 500);
        }

        // Robotic Background Animation
        function createRoboticBackground() {
            createRoboticGrid();
            createCircuitLines();
            createFloatingCode();
        }

        function createRoboticGrid() {
            const grid = document.getElementById('roboticGrid');
            for (let i = 0; i < 100; i++) {
                const dot = document.createElement('div');
                dot.className = 'grid-dot';
                dot.style.left = (i % 10) * 10 + '%';
                dot.style.top = Math.floor(i / 10) * 10 + '%';
                dot.style.animationDelay = Math.random() * 5 + 's';
                grid.appendChild(dot);
            }
        }

        function createCircuitLines() {
            const container = document.getElementById('circuitLines');
            for (let i = 0; i < 20; i++) {
                const line = document.createElement('div');
                line.className = 'circuit-line';
                line.style.left = Math.random() * 100 + '%';
                line.style.top = Math.random() * 100 + '%';
                line.style.width = Math.random() * 200 + 50 + 'px';
                line.style.height = Math.random() * 200 + 50 + 'px';
                line.style.animationDelay = Math.random() * 3 + 's';
                container.appendChild(line);
            }
        }

        function createFloatingCode() {
            const container = document.getElementById('floatingCode');
            const codeElements = ['{ }', '< >', '[ ]', '( )', '&&', '||', '++', '--', '=>', '!='];
            
            setInterval(() => {
                const codeEl = document.createElement('div');
                codeEl.className = 'floating-code-item';
                codeEl.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
                codeEl.style.left = Math.random() * 100 + '%';
                codeEl.style.animationDuration = (Math.random() * 4 + 3) + 's';
                container.appendChild(codeEl);

                setTimeout(() => {
                    if (codeEl.parentNode) {
                        codeEl.parentNode.removeChild(codeEl);
                    }
                }, 7000);
            }, 500);
        }

        // Navigation
        function initNavigation() {
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    const section = item.getAttribute('data-section');
                    scrollToSection(section);
                    
                    // Update active nav item
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                });
            });
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        }

        // Scroll Effects
        function initScrollEffects() {
            const sections = document.querySelectorAll('.section');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        
                        // Update active nav item based on visible section
                        const sectionId = entry.target.id;
                        const navItems = document.querySelectorAll('.nav-item');
                        navItems.forEach(nav => {
                            nav.classList.remove('active');
                            if (nav.getAttribute('data-section') === sectionId) {
                                nav.classList.add('active');
                            }
                        });
                    }
                });
            }, { threshold: 0.3 });

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // Add 3D tilt effect to cards
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.querySelectorAll('.skill-card, .project-card').forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = (y - centerY) / 10;
                        const rotateY = (centerX - x) / 10;
                        
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                    });
                });
            }, 1000);
        });
    