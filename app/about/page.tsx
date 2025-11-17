import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, Target, Zap, Users, BookOpen } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Acerca de | L.E.I. - Liderar, Ejecutar, Inspirar',
  description: 'Conoce al equipo detrás de L.E.I. y nuestra filosofía de liderazgo en ingeniería',
}

const team = [
  {
    name: 'Christian Gabriel Mendoza',
    role: 'Líder de Investigación y Estrategia de Contenido',
    bio: 'Estudiante de ingeniería apasionado por el liderazgo transformacional y la gestión estratégica de equipos. Especializado en frameworks de liderazgo y desarrollo de personas.',
    articles: [
      'Liderazgo Transformacional vs Transaccional: ¿Cuál Necesita tu Equipo?',
      'De la Teoría a la Práctica: Construyendo Tu Identidad como Líder Ingeniero'
    ],
    image: '/team/christian.jpg'
  },
  {
    name: 'Luis Rafael Jiménez',
    role: 'Líder de Innovación y Metodologías Ágiles',
    bio: 'Ingeniero con enfoque en metodologías colaborativas y Design Thinking. Experto en facilitar dinámicas de equipo y procesos de innovación en entornos digitales.',
    articles: [
      'Design Thinking Colaborativo: Una Dinámica Digital para Equipos de Alto Rendimiento'
    ],
    image: '/team/luis.jpg'
  },
  {
    name: 'José Miguel Gómez',
    role: 'Líder de Desarrollo Digital y Gestión del Talento',
    bio: 'Estudiante de ingeniería especializado en liderazgo digital y desarrollo profesional. Enfocado en herramientas de feedback y construcción de equipos remotos de alto rendimiento.',
    articles: [
      'Feedback 360° Digital: Transformando la Retroalimentación en Herramienta de Crecimiento',
      'El Líder Digital: Habilidades Esenciales para Inspirar Equipos a Distancia'
    ],
    image: '/team/jose.jpg'
  }
]

const tools = [
  { 
    name: 'Google Docs', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
      </svg>
    )
  },
  { 
    name: 'Notion', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M11 17.5v-6.5h.5l4 6h.5v-6.5" />
        <path d="M19.077 20.071l-11.53 .887a1 1 0 0 1 -.876 -.397l-2.471 -3.294a1 1 0 0 1 -.2 -.6v-10.741a1 1 0 0 1 .923 -.997l11.389 -.876a2 2 0 0 1 1.262 .33l1.535 1.023a2 2 0 0 1 .891 1.664v12.004a1 1 0 0 1 -.923 .997z" />
        <path d="M4.5 5.5l2.5 2.5" />
        <path d="M20 7l-13 1v12.5" />
      </svg>
    )
  },
  { 
    name: 'Slack', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6" />
        <path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6" />
        <path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6" />
        <path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6" />
      </svg>
    )
  },
  { 
    name: 'GitHub', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    )
  },
  { 
    name: 'Zoom', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor">
        <path d="M19.283 17.4c-0.367 0.374-0.879 0.606-1.444 0.606-1.117 0-2.023-0.906-2.023-2.023s0.906-2.023 2.023-2.023c0.929 0 1.712 0.626 1.949 1.479l0.003 0.014c0.045 0.159 0.071 0.341 0.071 0.53 0 0.552-0.221 1.052-0.579 1.417l0-0zM15.471 13.586c-0.648 0.615-1.052 1.483-1.052 2.446 0 1.861 1.509 3.37 3.37 3.37s3.37-1.509 3.37-3.37c0-1.54-1.033-2.838-2.444-3.241l-0.024-0.006c-0.27-0.078-0.581-0.123-0.902-0.123-0.899 0-1.716 0.352-2.32 0.925l0.002-0.001zM28.296 12.601c-0.802 0.001-1.522 0.352-2.016 0.909l-0.002 0.003c-0.496-0.562-1.219-0.915-2.023-0.915-0.563 0-1.086 0.173-1.519 0.468l0.009-0.006c-0.316-0.278-0.73-0.451-1.184-0.462l-0.002-0v6.742l0.337-0.016c0.544-0.014 0.981-0.451 0.995-0.993l0-0.001 0.016-0.337v-2.361l0.017-0.337c0-0.001 0-0.002 0-0.003 0-0.245 0.061-0.477 0.169-0.679l-0.004 0.008c0.238-0.405 0.671-0.672 1.166-0.672s0.928 0.267 1.162 0.664l0.003 0.006c0.103 0.196 0.164 0.428 0.165 0.675v0l0.017 0.339v2.361l0.016 0.336c0.022 0.54 0.454 0.972 0.991 0.995l0.002 0 0.337 0.016v-3.708l0.015-0.337c0-0.001 0-0.002 0-0.003 0-0.247 0.062-0.48 0.171-0.683l-0.004 0.008c0.238-0.403 0.67-0.669 1.165-0.669 0.496 0 0.929 0.268 1.164 0.666l0.003 0.006c0.102 0.195 0.162 0.427 0.162 0.673 0 0.001 0 0.001 0 0.002v-0l0.019 0.337v2.361l0.016 0.336c0.020 0.541 0.454 0.975 0.993 0.995l0.002 0 0.337 0.016v-4.045c-0.001-1.488-1.208-2.694-2.697-2.694-0.001 0-0.002 0-0.003 0h0zM12.206 17.4c-0.37 0.393-0.894 0.638-1.475 0.638-1.117 0-2.023-0.906-2.023-2.023s0.906-2.023 2.023-2.023c0.924 0 1.703 0.619 1.945 1.465l0.004 0.014c0.047 0.163 0.075 0.351 0.075 0.544 0 0.536-0.209 1.024-0.549 1.386l0.001-0.001zM10.78 12.6h-0.005c-1.86 0.001-3.367 1.509-3.367 3.368s1.508 3.368 3.368 3.368 3.368-1.508 3.368-3.368c0-1.86-1.507-3.367-3.366-3.368h-0zM6.734 18.008l-0.337-0.015h-3.035l4.044-4.045-0.016-0.337c-0.013-0.544-0.451-0.982-0.994-0.995l-0.001-0-0.337-0.016h-5.052l0.018 0.337c0.026 0.538 0.455 0.967 0.99 0.995l0.002 0 0.337 0.016h3.037l-4.049 4.045 0.017 0.336c0.019 0.541 0.453 0.975 0.992 0.995l0.002 0 0.337 0.016h5.056l-0.018-0.337c-0.024-0.539-0.455-0.969-0.991-0.993l-0.002-0z" />
      </svg>
    )
  }
]

const timeline = [
  {
    phase: 'Fase 1',
    title: 'Investigación y Conceptualización',
    leader: 'Christian',
    activities: ['Investigación de teorías', 'Definición framework', 'Análisis audiencia'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    phase: 'Fase 2',
    title: 'Creación de Contenido',
    leader: 'José',
    activities: ['Redacción colaborativa', 'Revisión por pares', 'Iteraciones'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    phase: 'Fase 3',
    title: 'Diseño y Desarrollo Web',
    leader: 'Luis',
    activities: ['Arquitectura del blog', 'Diseño UX/UI', 'Implementación técnica'],
    color: 'from-green-500 to-green-600'
  },
  {
    phase: 'Fase 4',
    title: 'Lanzamiento y Comunidad',
    leader: 'Todo el equipo',
    activities: ['Promoción', 'Engagement', 'Planning futuro'],
    color: 'from-orange-500 to-orange-600'
  }
]

const values = [
  {
    icon: Target,
    title: 'Practicamos lo que Predicamos',
    description: 'No solo escribimos sobre liderazgo distribuido, lo vivimos en cada fase del proyecto'
  },
  {
    icon: Zap,
    title: 'Aprendizaje Continuo',
    description: 'Cada artículo es una oportunidad de investigar, debatir y crecer'
  },
  {
    icon: Users,
    title: 'Accesibilidad del Conocimiento',
    description: 'Contenido gratuito, de calidad, en español, para toda la comunidad tech'
  },
  {
    icon: BookOpen,
    title: 'De la Teoría a la Acción',
    description: 'Frameworks prácticos, no solo conceptos abstractos'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Acerca de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                L.E.I.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Liderar, Ejecutar, Inspirar
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Liderar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    con visión estratégica clara
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">⚙️ Ejecutar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    proyectos con excelencia
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">💡 Inspirar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    equipos de alto rendimiento
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tres estudiantes de ingeniería unidos por la pasión de desarrollar líderes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  {/* Placeholder for member image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="w-4 h-4" />
                      <span>{member.articles.length} artículo{member.articles.length > 1 ? 's' : ''}</span>
                    </div>
                    <ul className="space-y-1 pl-6">
                      {member.articles.map((article, i) => (
                        <li key={i} className="text-xs text-muted-foreground list-disc">
                          {article}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Cómo Trabajamos Juntos
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Practicamos lo que predicamos. Nuestro proceso de colaboración refleja los principios 
              de liderazgo distribuido y gestión ágil que exploramos en el blog.
            </p>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Nuestras Herramientas</CardTitle>
                <CardDescription>Stack de colaboración y productividad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {tools.map((tool, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer"
                    >
                      {typeof tool.icon === 'string' ? (
                        <span className="text-3xl">{tool.icon}</span>
                      ) : (
                        <div className="text-primary">{tool.icon}</div>
                      )}
                      <span className="text-xs font-medium text-center">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Timeline de Liderazgo Rotativo</h3>
              {timeline.map((phase, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${phase.color}`} />
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-lg">{phase.phase}: {phase.title}</CardTitle>
                        <CardDescription>Líder: {phase.leader}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${phase.color}`}>
                        {phase.phase}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-3 gap-3">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Nuestra Filosofía
            </h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Como estudiantes de ingeniería en Venezuela, observamos una brecha crítica: 
                    mientras dominamos las competencias técnicas, rara vez recibimos formación en 
                    liderazgo y gestión de equipos. Sin embargo, los desafíos más complejos que 
                    enfrentaremos en nuestras carreras no serán puramente técnicos, sino 
                    socio-técnicos: alinear personas, gestionar conflictos, inspirar visión compartida.
                  </p>
                  <p>
                    L.E.I. nació de la convicción de que el liderazgo no es un talento innato, 
                    sino una habilidad que se puede desarrollar sistemáticamente. Aplicamos 
                    principios de ingeniería al desarrollo personal: iteración, experimentación, 
                    medición de resultados.
                  </p>
                  <p className="font-medium text-foreground">
                    Este blog es tanto una herramienta de aprendizaje para nosotros como un 
                    recurso para la comunidad tech hispanohablante. Cada artículo que escribimos 
                    nos desafía a profundizar en conceptos, cada dinámica que compartimos la hemos 
                    probado primero con nuestros propios equipos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-xl text-muted-foreground">
              Los principios que guían nuestro trabajo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with links */}
      <section className="py-12 bg-background border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Únete a nuestra comunidad
            </h2>
            <p className="text-lg text-muted-foreground">
              Explora nuestros artículos sobre liderazgo en ingeniería
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/blog">
                  Explorar el Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
