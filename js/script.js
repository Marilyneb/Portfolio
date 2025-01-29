const modalData = {
    project1: {
        title: "The Elevator Pitch",
        description: "A collaborative short film project focused on delivering a powerful and concise narrative within a limited time frame. This project simulates the high-stakes scenario of pitching an idea or concept in the span of an elevator ride. It explores the art of storytelling by showcasing creativity, teamwork, and effective communication. From scriptwriting and storyboarding to filming and editing, the project emphasizes clarity and engagement, delivering a memorable message in a visually compelling manner.",
        gallery: [
          "<iframe src='https://player.vimeo.com/video/1016807693' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
        ],
    },
  project2: {
    title: "Interactive Shader Editor",
    description: "The Interactive Shader Editor project focuses on creating an intuitive, user-friendly platform for designing and experimenting with shaders in real time. This tool allows users to write, modify, and visualize custom shaders through an interactive interface, providing instant feedback on changes. The project aims to facilitate exploration and learning of shader programming by making complex concepts accessible to both beginners and advanced users.",
    gallery: [
      "<iframe src='https://player.vimeo.com/video/1016816163?share=copy#t=0' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],
    link: "https://github.com/Marilyneb/Shader-Editor-MSc-Project" // Add project link
  },
  project3: {
    title: "Coffee Advertisement",
    description: "", // Add description if applicable
    gallery: [
      "<iframe src='https://player.vimeo.com/video/1049884794' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],
  },
  project4: {
    title: "Avocado RenderMan",
    description: "This project required  simple real-world object had to be chosen, which had to be modeled and rendered in a scene using RenderMan.The object had to be analyzed to determine the characteristics of its surface and to realize them using RIB and OSL.",
    gallery: [
        "<img src='assets/Avocadooo.jpg' alt='Avocado Render 1'>",
        
    ],
    link: "https://github.com/Marilyneb/Renderman-Project" // Add project link
  },
  project5: {
    title: "Bouncing Ball",
    description: "The primary artistic influence for this project is M.C. Escher's iconic print featuring an impossible staircase. The goal is to capture the essence of Escher's optical illusions while incorporating realistic bouncing ball movement in the animation.",
    gallery: [
        "<iframe src='https://player.vimeo.com/video/1049884923' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],
},
project6: {
    title: "The Inn at the Edge of the World",
    description: "A short movie inspired by a short script. This project was a collaboration with a fellow student.",
    gallery: [
        "<iframe src='https://player.vimeo.com/video/750031839' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],
},
  project7: {
    title: "Houdini Digital Asset (HDA)",
    description: "The aim of the Houdini project was to create a Houdini Digital Asset (HDA) for generating a garden that can be configured with a user interface.",
    gallery: [
      "<iframe src='https://player.vimeo.com/video/1049884680' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],

  },
  project8: {
    title: "Asset Library",
    description: "This project is a web-based application that allows users to upload, tag, and search for 3D models.",
    gallery: [
      "<iframe src='https://player.vimeo.com/video/1049885295' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
    ],
    link: "https://github.com/NCCA/msccavepipelineandtdproject24-Marilyneb/tree/main" // Add project link
  },

project9: {
    title: "Character Animation",
    description: "", // Add description if applicable
    gallery: [
      "<iframe src='https://player.vimeo.com/video/666804772' width='640' height='360' frameborder='0' allow='fullscreen' allowfullscreen></iframe>"
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

// Lazy load all videos and images
document.addEventListener("DOMContentLoaded", () => {
    const lazyVideos = document.querySelectorAll("video");
    const lazyImages = document.querySelectorAll("img");

    lazyVideos.forEach(video => {
        video.setAttribute("loading", "lazy");
        video.setAttribute("preload", "none");
    });

    lazyImages.forEach(img => {
        img.setAttribute("loading", "lazy");
    });
});

// Lazy load all videos and images
document.addEventListener("DOMContentLoaded", () => {
    const lazyVideos = document.querySelectorAll("video");
    const lazyImages = document.querySelectorAll("img");

    lazyVideos.forEach(video => {
        video.setAttribute("loading", "lazy");
        video.setAttribute("preload", "none");
    });

    lazyImages.forEach(img => {
        img.setAttribute("loading", "lazy");
    });
});

function openModal(key) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");
    const description = document.getElementById("modal-description");
    const gallery = document.getElementById("modal-gallery");
    const viewMoreButton = document.querySelector(".view-more");
    const data = modalData[key];

    // Pause all videos on the page
    document.querySelectorAll("video").forEach(video => video.pause());

    if (data) {
        title.textContent = data.title;
        description.textContent = data.description || "";
        gallery.innerHTML = data.gallery.map(item => `<div class="gallery-item">${item}</div>`).join(""); // This will work for iframe as well
        viewMoreButton.style.display = data.link ? "inline-block" : "none";
        if (data.link) viewMoreButton.href = data.link;

        modal.style.display = "flex";
        currentIndex = 0;
        updateGallery();
    } else {
        console.error(`No data found for key: ${key}`);
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

    // Reset modal content to avoid lingering videos
    document.getElementById("modal-gallery").innerHTML = "";

    // Stop native HTML5 videos
document.querySelectorAll(".portfolio-item video").forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.load(); // Reload the video to ensure the poster is displayed
});
    // Stop and reset Vimeo iframe videos properly
    document.querySelectorAll("#modal-gallery iframe").forEach(iframe => {
        const src = iframe.src;
        iframe.src = ""; // Remove src to stop video
        iframe.src = src; // Restore src after a small delay
    });
}


document.getElementById("close-modal").addEventListener("click", closeModal);
window.addEventListener("click", event => {
    if (event.target === document.getElementById("modal")) closeModal();
});