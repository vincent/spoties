<script>
  import Nav from "$lib/components/Nav/Nav.svelte";
  const { data } = $props();
  const { name: siteName, logo: siteLogo } = $derived(data.config.site ?? {});
</script>

<section
  class="mx-auto flex min-h-screen w-full max-w-(--breakpoint-2xl) flex-col"
>
  <Nav {siteName} {siteLogo} />

  <div class="p-4 md:p-8 lg:p-16 dark:bg-gray-800">
    <h1
      class="mb-6 text-3xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Cómo Crear Formularios de Eventos Multiubicación: La Guía Completa para
      Organizadores de Eventos
    </h1>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Gestionar voluntarios y personal en múltiples ubicaciones de eventos puede
      ser abrumador. Ya sea que organices un festival de música, una conferencia
      o un evento comunitario, coordinar personas en diferentes sedes requiere
      las herramientas adecuadas. Esta guía completa te muestra cómo crear
      formularios profesionales de eventos con múltiples ubicaciones usando
      Spoti.es, la plataforma de gestión de personal para eventos.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      ¿Qué es la Gestión de Eventos Multiubicación?
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      La gestión de eventos multiubicación implica coordinar personal,
      voluntarios y participantes en varias sedes simultáneamente. Este enfoque
      es común para:
    </p>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Festivales culturales en varios lugares y fechas</li>
      <li>Festivales de música con múltiples escenarios</li>
      <li>Conferencias corporativas con salas paralelas</li>
      <li>Eventos comunitarios en diferentes barrios</li>
      <li>Ferias comerciales con diversas áreas de exposición</li>
      <li>Torneos deportivos en varias instalaciones</li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      El principal desafío es asegurar que cada ubicación cuente con suficiente
      personal y mantener una comunicación clara entre todas las sedes.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      ¿Por qué Elegir Spoti.es para Eventos Multiubicación?
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Spoti.es está diseñado específicamente para organizadores de eventos que
      necesitan gestionar eventos complejos y multiubicación de manera
      eficiente. A diferencia de los generadores de formularios genéricos,
      Spoti.es ofrece funciones específicas por ubicación que facilitan la
      coordinación de voluntarios y la gestión de personal.
    </p>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Beneficios Clave:
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Organización por ubicación</span>: Asigna
        roles específicos a diferentes sedes
      </li>
      <li>
        <span class="font-semibold">Gestión de turnos</span>: Controla la
        capacidad y los horarios de cada ubicación
      </li>
      <li>
        <span class="font-semibold">Integración de geolocalización</span>: Mapeo
        preciso de sedes
      </li>
      <li>
        <span class="font-semibold">Coordinación en tiempo real</span>:
        Actualizaciones instantáneas en todas las ubicaciones
      </li>
      <li>
        <span class="font-semibold">Presentación profesional</span>: Formularios
        limpios y accesibles que fomentan la participación
      </li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Guía Paso a Paso: Cómo Crear tu Formulario de Evento Multiubicación
    </h2>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Primeros Pasos con Spoti.es
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold"
          >Navega a <a
            href="https://spoti.es"
            class="text-primary-700 hover:text-primary-900 underline"
            >https://spoti.es</a
          ></span
        >
      </li>
      <li>
        <span class="font-semibold">Crea tu evento</span> realizando:
        <ul class="ml-6 list-inside list-disc">
          <li>Haz clic en el botón principal de la página de inicio, o</li>
          <li>
            Selecciona "añadir nuevo" desde tu lista de eventos existentes
          </li>
        </ul>
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Configurando tu Formulario de Evento
    </h3>
    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Detalles del Evento
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Comienza estableciendo la base de tu evento:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Título del evento</span>: Elige un nombre
        claro y descriptivo que refleje el propósito de tu evento
      </li>
      <li>
        <span class="font-semibold">Descripción del evento</span>: Proporciona
        detalles completos sobre tu evento, incluyendo:
        <ul class="ml-6 list-inside list-disc">
          <li>Fecha y duración</li>
          <li>Propósito y objetivos generales</li>
          <li>Qué pueden esperar los participantes</li>
          <li>Cualquier requisito especial o preparativos necesarios</li>
        </ul>
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Una descripción bien redactada aumenta la participación y te ayuda a
      encontrar la mejor organización de personal para tu evento.
    </p>

    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Creando Preguntas Efectivas
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Las preguntas recopilan información esencial de todos los participantes,
      independientemente de la ubicación elegida. Un cuestionario estratégico te
      ayuda a:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Recopilar información de contacto</li>
      <li>Conocer el nivel de experiencia de los participantes</li>
      <li>Obtener restricciones alimentarias o necesidades de accesibilidad</li>
      <li>Evaluar la disponibilidad y el nivel de compromiso</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Tipos de Preguntas Disponibles:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Información personal</span>: Nombres,
        dirección
      </li>
      <li>
        <span class="font-semibold">Texto corto</span>: Números de teléfono,
        contactos de emergencia
      </li>
      <li>
        <span class="font-semibold">Texto largo</span>: Descripción de
        experiencia, solicitudes especiales, detalles de disponibilidad
      </li>
      <li>
        <span class="font-semibold">Selección única</span>: Método de
        comunicación preferido, tallas de camiseta
      </li>
      <li>
        <span class="font-semibold">Selección múltiple</span>: Habilidades,
        experiencia en eventos previos, intereses
      </li>
      <li>
        <span class="font-semibold">Rango</span>: Nivel de experiencia (1-10),
        horas de disponibilidad
      </li>
      <li>
        <span class="font-semibold">Valoración</span>: Clasificación de
        preferencias, nivel de comodidad con diferentes tareas
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Consejo profesional</span>: Marca como
      obligatorias las preguntas críticas, pero mantén preguntas opcionales para
      recopilar información adicional que pueda mejorar la planificación de tu
      evento.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Gestionando Múltiples Ubicaciones
    </h3>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      La sección de ubicaciones es donde Spoti.es realmente destaca para eventos
      multiubicación. Cada ubicación representa una sede o área distinta dentro
      de tu evento.
    </p>
    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Configuración de Ubicaciones
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Para cada sede, proporciona:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Etiqueta de ubicación</span>: Nombre corto y
        memorable (ej., "Escenario Principal", "Carpa de Registro", "Zona de
        Comida")
      </li>
      <li>
        <span class="font-semibold">Descripción detallada</span>: Incluye
        instrucciones específicas, servicios y expectativas
      </li>
      <li>
        <span class="font-semibold">Geolocalización</span>: El mapeo preciso
        ayuda a los participantes a encontrar las sedes y facilita la logística
      </li>
    </ul>

    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Comprendiendo los Turnos: La Clave para una Gestión Eficiente del Personal
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Los turnos representan oportunidades específicas dentro de cada ubicación.
      Ofrecen un control detallado sobre la gestión del personal:
    </p>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Turnos por horario:
    </p>
    <ul class="mb-2 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>"Turno de mañana (8AM-12PM)"</li>
      <li>"Cobertura de tarde (12PM-5PM)"</li>
      <li>"Montaje vespertino (5PM-8PM)"</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Turnos por área:
    </p>
    <ul class="mb-2 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>"Seguridad en la entrada principal"</li>
      <li>"Coordinación de backstage"</li>
      <li>"Gestión de zona VIP"</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Gestión de capacidad:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Turnos limitados</span>: "Cabina de sonido
        (máx. 2 personas)"
      </li>
      <li>
        <span class="font-semibold">Turnos ilimitados</span>: "Voluntarios
        generales (ilimitado)"
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Esta flexibilidad te permite ajustar las necesidades exactas de personal
      con la disponibilidad de voluntarios, evitando problemas de sobrepoblación
      o falta de personal.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Estrategias para la Gestión de Ubicaciones
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Nombres consistentes</span>: Usa nombres
        claros y lógicos en todas las ubicaciones
      </li>
      <li>
        <span class="font-semibold">Descripciones detalladas</span>: Incluye
        información sobre estacionamiento, puntos de referencia cercanos e
        instrucciones especiales
      </li>
      <li>
        <span class="font-semibold">Capacidad realista</span>: Establece límites
        adecuados según el espacio real y la capacidad de supervisión
      </li>
      <li>
        <span class="font-semibold">Planificación de respaldo</span>: Considera
        cómo manejarás cambios de último minuto o ausencias
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Excelencia en la Comunicación
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Coordinación previa al evento</span>: Envía
        información específica de la ubicación a los participantes asignados
      </li>
      <li>
        <span class="font-semibold">Actualizaciones el día del evento</span>:
        Usa las notificaciones de Spoti.es para comunicarte en tiempo real
      </li>
      <li>
        <span class="font-semibold">Coordinación entre ubicaciones</span>:
        Mantén canales de comunicación entre los coordinadores de sedes
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Gestión en Tiempo Real
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Ver recuentos de inscripciones en vivo por ubicación</li>
      <li>Rastrear la utilización de la capacidad en todas las sedes</li>
      <li>Recibir notificaciones instantáneas de nuevos registros o cambios</li>
    </ul>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Análisis Posterior al Evento
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Analizar patrones de participación por ubicación</li>
      <li>Revisar la utilización de la capacidad</li>
      <li>Recopilar comentarios de los participantes</li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Desafíos Comunes en Eventos Multiubicación y Soluciones
    </h2>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Desafío: Distribución Desigual
    </h3>
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problema</span>: Algunas ubicaciones reciben
      demasiados voluntarios mientras que otras carecen de personal.<br />
      <span class="font-semibold">Solución</span>: Usa los límites de capacidad
      de Spoti.es y proporciona descripciones claras de lo que implica cada
      ubicación.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Desafío: Cambios de Última Hora
    </h3>
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problema</span>: Los voluntarios cancelan o
      hay cambios en las sedes.<br />
      <span class="font-semibold">Solución</span>: Utiliza el sistema de
      notificaciones de Spoti.es para comunicar rápidamente las actualizaciones
      a los participantes afectados.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Desafío: Logística Compleja
    </h3>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problema</span>: Coordinar múltiples sedes se
      vuelve abrumador.<br />
      <span class="font-semibold">Solución</span>: Usa mensajes específicos por
      ubicación y define claramente los roles dentro de cada turno.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Historias de Éxito: Eventos Multiubicación con Spoti.es
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Los organizadores de eventos reportan mejoras significativas en la
      eficiencia de la coordinación al usar Spoti.es para eventos
      multiubicación. Los beneficios más comunes incluyen:
    </p>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Reducción del tiempo de planificación</li>
      <li>Disminución de ausencias gracias a una mejor comunicación</li>
      <li>Mayor satisfacción de los voluntarios mediante roles claros</li>
      <li>Mejor coordinación de eventos entre sedes</li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Comienza Hoy
    </h2>
    <p class="text-gray-700 dark:text-gray-300">
      ¿Listo para optimizar la gestión de tus eventos multiubicación? Visita <a
        href="https://spoti.es"
        class="text-primary-700 hover:text-primary-900 underline"
        >https://spoti.es</a
      > y experimenta la diferencia que pueden hacer las herramientas profesionales
      de gestión de personal. Con la creación intuitiva de formularios, la potente
      gestión de ubicaciones y las funciones de coordinación en tiempo real, Spoti.es
      transforma eventos complejos en experiencias exitosas y manejables.
    </p>
  </div>
</section>
