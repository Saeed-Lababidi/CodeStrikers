import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart2, Activity, Download, Share2, Video, Users, Zap, Timer, Target, Brain } from "lucide-react"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export default function AnalysisPage({ params }: { params: { id: string } }) {
  return (
    <Container className="py-6 sm:py-10">
      <PageHeader title="Analysis Results" description={`Match ID: ${params.id}`}>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button>Generate Report</Button>
        </div>
      </PageHeader>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3 mb-6 sm:mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle>Match Footage</CardTitle>
            <CardDescription>With AI player tracking overlay</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Original
                </Button>
                <Button size="sm">AI Overlay</Button>
                <Button variant="outline" size="sm">
                  Heatmap
                </Button>
              </div>
              <div className="text-sm text-gray-500">Duration: 12:34</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
            <CardDescription>Key insights from the footage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Players Tracked</p>
                  <p className="text-2xl font-bold">22</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Actions Analyzed</p>
                  <p className="text-2xl font-bold">342</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Timer className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Processing Time</p>
                  <p className="text-2xl font-bold">18 min</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Accuracy Score</p>
                  <p className="text-2xl font-bold">96%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="players">Player Analysis</TabsTrigger>
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="tactical">Tactical Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Team and player performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <BarChart2 className="h-16 w-16 text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement Heatmap</CardTitle>
                <CardDescription>Player positioning and movement patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <Activity className="h-16 w-16 text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Key Observations</CardTitle>
                <CardDescription>AI-generated insights from the analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">Technical Skills</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Player 7 demonstrated exceptional ball control and dribbling skills, maintaining possession under
                      pressure in 87% of challenges. Their first touch accuracy was 92%, significantly above the team
                      average of 78%.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">Physical Performance</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Player 10 covered the most distance at 11.3km with 24 high-intensity sprints. Their average sprint
                      speed of 32km/h was the highest on the team, with consistent performance throughout both halves
                      indicating excellent stamina.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">Tactical Awareness</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      The team maintained a compact defensive shape with an average distance of 7.2m between defensive
                      lines. Player 4 demonstrated excellent positional awareness, making 8 key interceptions by
                      anticipating passing lanes and opponent movements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Player {i + 1}</h3>
                      <p className="text-sm text-gray-500">
                        Position: {i % 3 === 0 ? "Forward" : i % 3 === 1 ? "Midfielder" : "Defender"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Technical Skills</span>
                      <span className="font-medium">{70 + i * 3}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${70 + i * 3}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span>Physical Attributes</span>
                      <span className="font-medium">{65 + i * 4}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${65 + i * 4}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span>Tactical Awareness</span>
                      <span className="font-medium">{60 + i * 5}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${60 + i * 5}%` }}></div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills Analysis</CardTitle>
              <CardDescription>Detailed breakdown of player technical abilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Passing Accuracy</h3>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </div>
                          <span>Player {i + 1}</span>
                        </div>
                        <div className="font-medium">{75 + i * 3}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Ball Control</h3>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </div>
                          <span>Player {i + 1}</span>
                        </div>
                        <div className="font-medium">{70 + i * 4}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Shooting Accuracy</h3>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </div>
                          <span>Player {i + 1}</span>
                        </div>
                        <div className="font-medium">{65 + i * 5}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tactical">
          <Card>
            <CardHeader>
              <CardTitle>Tactical Analysis</CardTitle>
              <CardDescription>Team formation and tactical patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-green-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-16 w-16 text-green-300 mx-auto mb-2" />
                  <p className="text-green-700">Tactical heatmap and positioning visualization</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Defensive Organization</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      The team maintained a compact 4-4-2 defensive shape with an average distance of 7.2m between
                      lines. The defensive line demonstrated good coordination with 14 successful offside traps.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Compactness</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span>Line Coordination</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Attacking Patterns</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      The team showed a preference for building attacks through the right flank (58% of attacks).
                      Players demonstrated effective third-man running patterns with 12 successful combinations leading
                      to shooting opportunities.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Build-up Efficiency</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span>Chance Creation</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
