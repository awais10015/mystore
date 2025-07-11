import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LucideProps,
  Mail,
  X,
  Eye,
  EyeOff,
  User,
  Lock,
} from "lucide-react";

import { SiGithub, SiGoogle } from "react-icons/si";

export const Icons = {
  gitHub: SiGithub,
  google: SiGoogle,
  arrowRight: ArrowRight,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  close: X,
  spinner: (props: LucideProps) => (
    <Loader2 className="animate-spin" {...props} />
  ),
  mail: Mail,
  eye: Eye,
  eyeOff: EyeOff,
  user: User,
  lock: Lock,
};
