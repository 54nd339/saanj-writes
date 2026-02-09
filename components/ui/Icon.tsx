import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  BookOpen,
  Feather,
  Search,
  Calendar,
  Clock,
  Share2,
  Link as LinkIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  email: Mail,
  moon: Moon,
  sun: Sun,
  menu: Menu,
  close: X,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowDown: ArrowDown,
  book: BookOpen,
  feather: Feather,
  search: Search,
  filter: Filter,
  calendar: Calendar,
  clock: Clock,
  share: Share2,
  link: LinkIcon,
  check: Check,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  external: ExternalLink,
  fileText: FileText,
  alertCircle: AlertCircle,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name as IconName];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={cn('flex-shrink-0', className)} />;
}
