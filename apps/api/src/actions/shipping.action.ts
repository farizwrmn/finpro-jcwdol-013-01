const getProvincesAction = async () => {
  try {
    const res = await fetch(`${process.env.RAJAONGKIR_API_URL}/province`, {
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string
      }
    })
    const data = await res.json()
    const provinces = data?.rajaongkir?.results || []

    return provinces;
  } catch (err) {
    throw err;
  }
}

const getCitiesAction = async (provinceId: string) => {
  if (!provinceId) return [];

  try {
    const res = await fetch(`${process.env.RAJAONGKIR_API_URL}/city?province=${provinceId}`, {
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string
      }
    })
    const data = await res.json()
    const cities = data?.rajaongkir?.results || []

    return cities
  } catch (err) {
    throw err;
  }
}

const getSubdistrictsAction = async (cityId: string) => {
  if (!cityId) return [];

  try {
    const res = await fetch(`${process.env.RAJAONGKIR_API_URL}/subdistrict?city=${cityId}`, {
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string
      }
    })
    const data = await res.json()
    const subdistricts = data?.rajaongkir?.results || []

    return subdistricts
  } catch (err) {
    throw err;
  }
}

const getCouriersAction = async (origin: string, destination: string) => {
  if (!origin || !destination) return [];

  try {
    const body = {
      origin: origin,
      originType: "subdistrict",
      destination: destination,
      destinationType: "subdistrict",
      weight: 1000,
      courier: "jne:pos:tiki:sicepat"
    }

    const res = await fetch(`${process.env.RAJAONGKIR_API_URL}/cost`, {
      method: 'POST',
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    const couriers = data?.rajaongkir?.results || []

    return couriers
  } catch (err) {
    throw err;
  }
}

export {
  getProvincesAction,
  getCitiesAction,
  getSubdistrictsAction,
  getCouriersAction,
}