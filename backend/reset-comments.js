const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetComments() {
  try {
    console.log('🗑️  Eliminando todos los comentarios...');
    
    const result = await prisma.comment.deleteMany({});
    
    console.log(`✅ Se eliminaron ${result.count} comentarios exitosamente`);
    console.log('💬 La base de datos de comentarios ha sido limpiada');
    
  } catch (error) {
    console.error('❌ Error al limpiar comentarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetComments();