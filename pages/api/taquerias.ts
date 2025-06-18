// pages/api/taquerias.ts
export default async function handler(req, res) {
  try {
    // Primero intentemos la ruta base
    console.log('Intentando conectar a la API...');
    
    // Prueba diferentes rutas posibles
    const possibleRoutes = [
      'https://primerotacos.onrender.com/api/taquerias',
      'https://primerotacos.onrender.com/taquerias',
      'https://primerotacos.onrender.com/api/taqueria',
      'https://primerotacos.onrender.com/'
    ];
    
    for (const route of possibleRoutes) {
      console.log(`Probando: ${route}`);
      const response = await fetch(route);
      const text = await response.text();
      
      console.log(`Respuesta de ${route}:`, text.substring(0, 100));
      
      // Si encontramos JSON válido, lo devolvemos
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          console.log('¡Datos encontrados!');
          return res.status(200).json(data);
        }
      } catch (e) {
        // No es JSON, continuar
      }
    }
    
    // Si no encontramos datos, devolver array vacío
    console.log('No se encontraron datos JSON en ninguna ruta');
    res.status(200).json([]);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
