import Image from "next/image";

/** Learning and practical work help people shape AI's trajectory. */
export default function HeroChart() {
  return (
    <Image
      src="/illustrations/sain-learning-to-steering.svg"
      alt="An accelerating AI trajectory starts at the origin. Two people learn and practise while a third points up at the turning point, where the curve forks into a steep orange path and a gentler grey one."
      width={720}
      height={500}
      className="h-auto w-full max-w-[560px]"
      priority
    />
  );
}
