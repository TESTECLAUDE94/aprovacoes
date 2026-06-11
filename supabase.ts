import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para upload de arquivos
export async function uploadArquivo(file: File, pasta: string): Promise<string | null> {
  const ext = file.name.split('.').pop()
  const nome = `${pasta}/${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('conteudos')
    .upload(nome, file, { cacheControl: '3600', upsert: false })

  if (error) {
    console.error('Erro upload:', error)
    return null
  }

  const { data: urlData } = supabase.storage.from('conteudos').getPublicUrl(data.path)
  return urlData.publicUrl
}
