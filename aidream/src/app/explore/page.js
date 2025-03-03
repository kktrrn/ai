import Link from "next/link";

export default function Explore() {
  return (
    <div className=" relative min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 overflow-hidden">
      {/* Видео как фон */}
      <div className="absolute top-0 left-0 w-full h-full z-0 backdrop-blur-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full backdrop-opacity-10 opacity-80"
        >
          <source src="/video/my-video-4.mp4" type="video/mp4" />
          The video cannot be played in your browser.
        </video>
      </div>

      <Link href="/" passHref>
        <h1 className="z-10 text-4xl sm:text-5xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300 cursor-pointer">
          Welcome to Dreamer AI
        </h1>
      </Link>

      <p className="text-lg sm:text-xl text-center max-w-2xl opacity-80 z-10 font-mono animate-fade-in">
        This dream journal is a way to turn self-reflection into something fun
        and engaging. Dreams are an important part of our lives, something we
        can feel but never fully control. They are how our mind and body send us
        signals, helping us understand our fears, worries and deepest desires.
        With this journal we invite you to explore your dreams with an open mind
        and a sense of curiosity.
      </p>
      <p className="font-semibold z-10 italic font-mono text-center text-emerald-950 animate-fade-in">
        Don’t take everything too seriously, self-reflection can be enjoyable
        too.
      </p>

      <div className="mt-12 flex gap-6">
        <Link
          href="/diary"
          className="z-10 opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Create Your Diary
        </Link>

        <Link
          href="/experience"
          className="z-10 opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Experience
        </Link>
      </div>
    </div>
  );
}
