import Particles from "react-tsparticles";

function ParticlesBackground() {

  return (

    <Particles
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 60,
          },

          color: {
            value: [
              "#a855f7",
              "#ec4899",
              "#3b82f6",
            ],
          },

          links: {
            enable: true,
            color: "#a855f7",
            distance: 150,
            opacity: 0.3,
          },

          move: {
            enable: true,
            speed: 1.5,
          },

          opacity: {
            value: 0.5,
          },

          size: {
            value: 3,
          },
        },
      }}

      className="absolute inset-0 -z-10"
    />
  );
}

export default ParticlesBackground;