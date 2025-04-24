"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Search, Filter, ChevronDown, ArrowUpDown, Star, StarHalf } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample player data
const players = [
  { id: 1, name: "Alex Johnson", age: 17, position: "Forward", rating: 4.5, matches: 12, club: "FC United" },
  { id: 2, name: "Sam Williams", age: 18, position: "Midfielder", rating: 4.2, matches: 15, club: "City FC" },
  { id: 3, name: "Jamie Smith", age: 16, position: "Defender", rating: 3.8, matches: 10, club: "FC United" },
  { id: 4, name: "Taylor Brown", age: 19, position: "Forward", rating: 4.7, matches: 14, club: "Rovers FC" },
  { id: 5, name: "Jordan Lee", age: 17, position: "Midfielder", rating: 4.0, matches: 11, club: "City FC" },
  { id: 6, name: "Casey Wilson", age: 18, position: "Goalkeeper", rating: 4.3, matches: 13, club: "FC United" },
  { id: 7, name: "Riley Martin", age: 16, position: "Defender", rating: 3.5, matches: 9, club: "Rovers FC" },
  { id: 8, name: "Morgan Davis", age: 19, position: "Forward", rating: 4.8, matches: 16, club: "City FC" },
  { id: 9, name: "Avery Thompson", age: 17, position: "Midfielder", rating: 4.1, matches: 12, club: "FC United" },
  { id: 10, name: "Quinn Roberts", age: 18, position: "Defender", rating: 3.9, matches: 11, club: "Rovers FC" },
]

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [clubFilter, setClubFilter] = useState("all")
  const [sortBy, setSortBy] = useState("age")
  const [sortOrder, setSortOrder] = useState("asc")

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => {
      // Search filter
      if (searchTerm && !player.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Position filter
      if (positionFilter !== "all" && player.position.toLowerCase() !== positionFilter) {
        return false
      }

      // Club filter
      if (clubFilter !== "all" && player.club !== clubFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === "age") {
        return sortOrder === "asc" ? a.age - b.age : b.age - a.age
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      } else if (sortBy === "matches") {
        return sortOrder === "asc" ? a.matches - b.matches : b.matches - a.matches
      } else {
        // Sort by name
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/upload" className="font-medium">
              Upload
            </Link>
            <Link href="/players" className="font-medium">
              Players
            </Link>
            <Link href="/leaderboard" className="font-medium text-green-600">
              Leaderboard
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-6 sm:py-10">
          <PageHeader title="Player Leaderboard" description="Compare and rank players based on performance metrics" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search players..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Position
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setPositionFilter("all")}>All Positions</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter("goalkeeper")}>Goalkeeper</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter("defender")}>Defender</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter("midfielder")}>Midfielder</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter("forward")}>Forward</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Club
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setClubFilter("all")}>All Clubs</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setClubFilter("FC United")}>FC United</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setClubFilter("City FC")}>City FC</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setClubFilter("Rovers FC")}>Rovers FC</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("age")}>Age</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("matches")}>Matches</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player, index) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.age}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.club}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {Array.from({ length: Math.floor(player.rating) }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {player.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        <span className="ml-1 text-sm">{player.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{player.matches}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/players/${player.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredPlayers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No players found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Container>
      </main>

      <footer className="border-t py-6">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 CodeStrikers. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              About
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  )
}
