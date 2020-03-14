
export const get_instruction = async(id) => {
  const url = `/api/instructions/${id}`
  try {
    const res = await fetch(url)
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Get Instruction:', e.message)
    throw e
  }
}

export const create_instruction = async(body) => {
  const url = "/api/instructions"
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Create Instruction:', e.message)
    throw e
  }
}

export const delete_instruction = async(id) => {
  const url = `/api/instructions/${id}`
  try {
    const res = await fetch(url, { method: 'DELETE' })
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Delete Instruction:', e.message)
    throw e
  }
}

export const get_instructions = async() => {
  const url = '/api/instructions'
  try {
    const res = await fetch(url)
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Get InstructionS!:', e.message)
    throw e
  }
}

export const create_step = async(instruction_id, body) => {
  const url = `/api/instructions/${instruction_id}/create_step`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Create Step:', e.message)
    throw e
  }
}

export const update_step = async(body) => {
  const url = '/api/instructions/update_step'
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Update Step:', e.message)
    throw e
  }
}

export const delete_step = async(id) => {
  const url = '/api/instructions/delete_step'
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id})
    })
    if (res.ok) return await res.json()
    throw new Error(`Res status: ${res.status}`)
  } catch(e) {
    console.log('Error: Delete Step:', e.message)
    throw e
  }
}
