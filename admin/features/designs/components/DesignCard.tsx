import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Design, DesignStatus } from '@prisma/client'
import Image from 'next/image'
import { CalendarDays, FileText, MoreVertical, User } from 'lucide-react'
import Link from 'next/link'
// TODO: ADD UPDATE, DELETE AND SHARE FUNCTIONALITY

const DesignCard = ({ design }: { design: Design }) => {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0 relative">
                <div className="aspect-video relative">
                    <Image
                        src={design.thumbnailUrl}
                        alt={design.name}
                        layout="fill"
                        objectFit="cover"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="absolute top-2 right-2 h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="absolute top-2 left-2 flex items-center flex-row-reverse  gap-2">
                        {design.published && (
                            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                                Published
                            </Badge>
                        )}
                        <Badge
                            variant={design.status === 'PENDING' ? 'secondary' : 'default'}
                            className="bg-white/50 backdrop-blur-sm"
                        >
                            {design.status}
                        </Badge>
                    </div>

                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="text-lg font-semibold">{design.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{design.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{design.createdBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDays size={16} />
                        <span>{new Date(design.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText size={16} />
                        <span>PDF</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default DesignCard
