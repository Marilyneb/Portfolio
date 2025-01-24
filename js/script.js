const modalData = {
  project1: {
      title: "The Elevator Pitch",
      description: "A collaborative short film project focused on delivering a powerful and concise narrative within a limited time frame. This project simulates the high-stakes scenario of pitching an idea or concept in the span of an elevator ride. It explores the art of storytelling by showcasing creativity, teamwork, and effective communication. From scriptwriting and storyboarding to filming and editing, the project emphasizes clarity and engagement, delivering a memorable message in a visually compelling manner.",
      gallery: [
          "<video controls src='assets/TheElevatorPitch_GroupProject_2024.mp4'></video>",
         
      ],

  },
  project2: {
      title: "Interactive Shader Editor",
      description: "The Interactive Shader Editor project focuses on creating an intuitive, user-friendly platform for designing and experimenting with shaders in real time. This tool allows users to write, modify, and visualize custom shaders through an interactive interface, providing instant feedback on changes. The project aims to facilitate exploration and learning of shader programming by making complex concepts accessible to both beginners and advanced users.",
      gallery: [
          "<video controls src='assets/interactive_shader_editor (480p).mp4'></video>",
          
      ],
      link: "https://github.com/Marilyneb/Shader-Editor-MSc-Project" // Add project link
  },
  project3: {
    title: "Coffee Advertisement",
    gallery: [
        "<video controls src='assets/project2 (720p).mp4'></video>",
        "<img src='assets/marilyne-bassoulou-marilyne-bassoulou-correction-1.jpg' alt='Screenshot 1'>",
       
    ],
  },
  project4: {
    title: "Avocado Render",
    description: "This project required  simple real-world object had to be chosen, which had to be modeled and rendered in a scene using RenderMan.The object had to be analyzed to determine the characteristics of its surface and to realize them using RIB and OSL.",
    gallery: [
        "<img src='assets/Avocadooo.jpg' alt='Avocado Render 1'>",
        
    ],
    link: "https://github.com/Marilyneb/Renderman-Project" // Add project link
  },
  project5: {
    title: "Bouncing Ball",
    description: "The primary artistic influence for this project is M.C. Escher's iconic print featuring an impossible staircase.The goal is to capture the essence of Escher's optical illusions while incorporating realistic bouncing ball movement in the animation.",
    gallery: [
        "<video controls src='assets/My Movie 4.mp4'></video>",
       
    ],
   
  },
  project6: {
    title: "The Inn at the Edge of the World",
    description: "A short movie inspired by a short script. This project was a collaboration with a fellow student.",
    gallery: [
        "<video controls src='assets/project (720p).mp4'></video>",
        
    ],
 
  },
  project7: {
    title: "Houdini Simulation",
    description: "The aim of the Houdini project was to create a Houdini Digital Asset (HDA) for generating a garden that can be configured with a user interface.",
    gallery: [
       "<video controls src='assets/Houdini.mov'></video>",
        
    ],

  },
  project8: {
    title: "Asset Library",
    description: "This project is a web-based application that allows users to upload, tag, and search for 3D models.",
    gallery: [
        "<video controls src='assets/video.mp4'></video>",
        
    ],
    link: "https://github.com/NCCA/msccavepipelineandtdproject24-Marilyneb/tree/main" // Add project link
},
project9: {
    title: "Fire Simulation",
    description: "The Interactive Shader Editor project focuses on creating an intuitive, user-friendly platform for designing and experimenting with shaders in real time. This tool allows users to write, modify, and visualize custom shaders through an interactive interface, providing instant feedback on changes. The project aims to facilitate exploration and learning of shader programming by making complex concepts accessible to both beginners and advanced users. The editor would support various types of shaders, such as vertex, fragment, and compute shaders, and provide a range of built-in effects and visualizations.",
    gallery: [
        "<video controls src='assets/interactive_shader_editor (480p).mp4'></video>",
        
    ],
    link: "https://github.com" // Add project link
},
project10: {
    title: "Character Animation",
    description: "",
    gallery: [
        "<video controls src='assets/marilyne_bassoulou_csc_343_final_project (720p).mp4'></video>",
        
    ],
  
},
  sketch1: {
      title: "Colored Wine Study",
      description: "",
      gallery: [
          "<img src='assets/marilyne-bassoulou-wine-colored.jpg' alt='Colored Wine Study 1'>",
          
      ],

  },
  sketch2: {
      title: "Wine Illustration",
      description: "",
      gallery: [
          "<img src='assets/marilyne-bassoulou-wine.jpg' alt='Wine Illustration'>",
          
      ],

  },
  sketch3: {
    title: "Abstract Study",
    description: "",
    gallery: [
        "<img src='assets/marilyne-bassoulou-study-project-1-1.jpg' alt='Abstract Study'>",
      
    ],
  
},
sketch4: {
    title: "Black and White Study Sketch",
    description: "",
    gallery: [
        "<img src='assets/marilyne-bassoulou-study-project-2.jpg' alt='Black and White Study Sketch'>",
        
    ],

}
};

// open the modal
function openModal(key) {
    // Pause all videos on the page
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });

    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const gallery = document.getElementById('modal-gallery');
    const viewMoreButton = document.querySelector('.view-more');
    const data = modalData[key];
  
    if (data) {
        title.textContent = data.title;
        description.textContent = data.description;
        gallery.innerHTML = data.gallery.map((item, index) =>
            `<div class="gallery-item" data-index="${index}">${item}</div>`
        ).join("");

        // Show link button only if the project has a valid link
        if (data.link && data.link !== "") {
            viewMoreButton.style.display = 'inline-block';
            viewMoreButton.href = data.link;
            viewMoreButton.textContent = 'Open on GitHub';
        } else {
            viewMoreButton.style.display = 'none';
        }

        currentIndex = 0; 
        updateGallery();
        modal.style.display = 'flex';
    } else {
        console.error(`No data found for key: ${key}`);
    }
}
// close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    const videoElements = modal.querySelectorAll('video');

    // Pause all video elements inside the modal and reset them
    videoElements.forEach(video => {
        video.pause();
        video.currentTime = 0; // Reset to the beginning
    });

    // Ensure thumbnails are displayed for all video items in the portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item video');
    portfolioItems.forEach(item => {
        if (item) {
            // Check if the video has a poster attribute
            const hasPoster = item.getAttribute('poster');
            if (hasPoster) {
                // Reset the poster to its original state upon modal close
                item.load(); // Reload to show thumbnail
            }
        }
    });

    modal.style.display = 'none';
}
// Add event listener to the close button
document.getElementById('close-modal').addEventListener('click', closeModal);

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Function gallery view
function updateGallery() {
    const gallery = document.getElementById('modal-gallery');
    const totalItems = gallery.children.length;

    // show the current item
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// navigate to the next gallery item
function nextItem() {
    const gallery = document.getElementById('modal-gallery');
    const totalItems = gallery.children.length;
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateGallery();
    }
}
// navigate to the previous gallery item
function prevItem() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
}

