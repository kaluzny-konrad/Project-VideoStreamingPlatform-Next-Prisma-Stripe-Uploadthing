import Link from 'next/link';
import React from 'react'
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { InfoIcon, ListIcon, PlusIcon, VideoIcon } from 'lucide-react';

type Props = {}

export default function AdminPanel({}: Props) {
    return (
      <div className="p-4 bg-white rounded-xl min-h-96">
        <h2 className="mb-6 text-lg font-bold text-slate-800">Creator Panel</h2>
        <p className="mb-2 text-xs font-light uppercase text-slate-400">
          Main menu
        </p>
        <div className="flex flex-col">
          <Link
            href={"/admin"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <InfoIcon size={16} className={cn("mr-2")} />
            Dashboard
          </Link>
          <Link
            href={"/admin/videos"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <VideoIcon size={16} className={cn("mr-2")} />
            List of videos
          </Link>

          <Link
            href={"/admin/courses"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <ListIcon size={16} className={cn("mr-2")} />
            List of courses
          </Link>
        </div>
      </div>
    );
  }
  