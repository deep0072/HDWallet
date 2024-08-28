import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'


export default function FullTextCard({ id, wallet }: {id: string, wallet: string}) {
  console.log(wallet, 'wallet')
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="text-white" variant="link">
          {id}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-100 bg-gray-700">
        <div className="flex justify-between ">
          <div className="space-y-5 text-white">
            <h3 className="text-sm font-semibold">{id}</h3>
            <p className="text-sm break-words block">{wallet}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
