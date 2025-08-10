import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface Props {
  onAvatarClick: () => void;
  clickCount: number;
  avatarSrc: string;
}

export default function AvatarHero({ onAvatarClick, clickCount, avatarSrc }: Props) {
  return (
    <div className="mb-8">
      <div className="relative w-32 h-32 mx-auto">
        {/* Anillo degradado que rota */}
        <motion.div
          className="absolute inset-0 rounded-full p-[3px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-black-500 via-pink-500 to-black-500" />
        </motion.div>

        {/* Contenedor clickeable con el avatar */}
        <motion.button
          type="button"
          onClick={onAvatarClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-violet-500 shadow-2xl shadow-purple-500/50 bg-neutral-900"
        >
          <Image
            src={avatarSrc}
            alt="Avatar de Joaquín"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />

          {/* Easter egg: relámpago cuando hay muchos clics */}
          {clickCount > 5 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-yellow-400 drop-shadow" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
