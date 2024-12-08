function rob(v, z = 0) {
    var sv = (-1) ** Math.floor(Math.random() * z);
    var s = Math.floor(Math.random() * v * sv);

    return s;
}
function makeMouseFollower(sectionSelector) {
    // Select the section where the functionality is applied
    const section = document.querySelector(sectionSelector);

    // Create the follower div
    const follower = document.createElement("div");
    follower.style.width = "30px";
    follower.style.height = "30px";
    follower.style.borderRadius = "50%";
    follower.style.backgroundColor = `rgb(0, 144, 255,0.3)`;
    follower.style.position = "absolute";
    follower.style.pointerEvents = "none";
    follower.style.transition = "transform 0.1s linear";
    follower.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    follower.style.display = "none"; // Initially hidden
    document.body.appendChild(follower);

    // Add event listeners to the section
    section.addEventListener("mousemove", (e) => {
        // Show the follower when the mouse is over the section
        follower.style.display = "block";
        follower.style.left = `${e.pageX}px`;
        follower.style.top = `${e.pageY}px`;
        follower.style.transform = "translate(-50%, -50%)";
    });

    section.addEventListener("mouseleave", () => {
        // Hide the follower when the mouse leaves the section
        follower.style.display = "none";
    });
}

// Usage
makeMouseFollower(".hero");
makeMouseFollower(".about-section")
function makeMouseDivPopoutWithThrottleAndRotation(sectionSelector) {
    const section = document.querySelector(sectionSelector);

    // Throttle function implementation
    const throttleFunction = (func, delay) => {
        let lastTime = 0;
        return (...args) => {
            const now = new Date().getTime();
            if (now - lastTime >= delay) {
                lastTime = now;
                func(...args);
            }
        };
    };

    const handleMouseMove = (e) => {
        // Create and position the colorful div
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = `${Math.random() * 25 + 20}px`; // Random width between 20-50px
        div.style.height = `4px`; // Random height between 20-50px
        div.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        div.style.borderRadius = "12px"; // Make it circular
        div.style.left = `${e.pageX + rob(120,120)}px`;
        div.style.top = `${e.pageY+100}px`;
        div.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
        div.style.opacity = "1";
        div.style.transition = "opacity 1s ease-out, transform 1s ease-out";

        // Add random rotation
        const randomRotation = Math.random() * 360; // Random rotation between 0-360 degrees
        div.style.transform = `rotate(${randomRotation}deg)`;

        document.body.appendChild(div);

        // Remove the div after 1 second
        setTimeout(() => {
            div.style.opacity = "0";
            div.style.transform += ` scale(0.5)`; // Shrink before removal
            setTimeout(() => div.remove(), 1000);
        }, 500);
    };

    // Wrap the mousemove event handler with throttling
    const throttledMouseMove = throttleFunction(handleMouseMove, 100); // Adjust delay (200ms) as needed
    section.addEventListener("mousemove", throttledMouseMove);
}

// Usage
makeMouseDivPopoutWithThrottleAndRotation(".hero");
