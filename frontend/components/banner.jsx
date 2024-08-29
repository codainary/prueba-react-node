import { cn } from '@/lib/utils'
import { Outfit } from 'next/font/google'
const font = Outfit({
    subsets: ['latin'],
    weight: ['600'],
})

export const Banner = ({ title, subtitle }) => {
    return (
        <div className="flex items-center lg:px-[440px] bg-[#F6F7F8] h-[226px] max-sm:justify-center">
            <div className="flex flex-col pt-16 h-full justify-center gap-2">
                <h1
                    className={cn(
                        'font-extrabold text-2xl text-[#f76136]',
                        font.className
                    )}
                >
                    {title}
                </h1>
                <span>{subtitle}</span>
            </div>
        </div>
    )
}
