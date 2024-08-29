import { cn } from '@/lib/utils'
import { Outfit } from 'next/font/google'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog'
import { useState } from 'react'

const font = Outfit({
    subsets: ['latin'],
    weight: ['600'],
})

export const SectionTittle = ({ title, subtitle, btonTitle, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = (open) => {
        setIsOpen(open)
    }

    return (
        <div className="flex items-center lg:px-[440px] py-9 bg-white h-full w-auto justify-between max-sm:flex-col max-sm:gap-6">
            <div className="flex flex-col max-sm:items-center">
                <h1 className={cn('font-extrabold text-2xl', font.className)}>
                    {title}
                </h1>
                <span>{subtitle}</span>
            </div>

            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button>{btonTitle}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Solicitud</DialogTitle>
                        <DialogDescription>
                            Aquí puedes agregar los detalles de la solicitud que
                            quieres crear.
                        </DialogDescription>
                    </DialogHeader>
                    <div>{children}</div>
                    <DialogClose asChild>
                        <Button variant="secondary">Cerrar</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}
