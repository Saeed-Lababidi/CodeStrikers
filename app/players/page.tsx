import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ChevronDown, Star, StarHalf, ArrowUpDown } from "lucide-react"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export default function PlayersPage() {
  return (
    <Container className="py-6 sm:py-10">
      <PageHeader title="Player Database" description="View and compare analyzed players">
        <Button>Add New Player</Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search players..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All Players</TabsTrigger>
          <TabsTrigger value="forwards">Forwards</TabsTrigger>
          <TabsTrigger value="midfielders">Midfielders</TabsTrigger>
          <TabsTrigger value="defenders">Defenders</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <PlayerCard key={i} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forwards">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PlayerCard key={i} index={i} position="Forward" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="midfielders">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PlayerCard key={i} index={i + 3} position="Midfielder" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="defenders">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PlayerCard key={i} index={i + 6} position="Defender" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  )
}

function PlayerCard({ index, position }: { index: number; position?: string }) {
  const positions = ["Forward", "Midfielder", "Defender"]
  const playerPosition = position || positions[index % 3]
  const rating = 3.5 + (index % 3) * 0.5

  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-gray-100 relative">
          <img
            src={`/placeholder.svg?height=300&width=400&text=Player+${index + 1}`}
            alt={`Player ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {playerPosition}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">Player {index + 1}</h3>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: Math.floor(rating) }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            {rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
            <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Age:</span>
              <span>{18 + index}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Height:</span>
              <span>{170 + index * 2} cm</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Foot:</span>
              <span>{index % 2 === 0 ? "Right" : "Left"}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Games Analyzed:</span>
              <span>{3 + index}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Profile
            </Button>
            <Button className="flex-1">Analysis</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
