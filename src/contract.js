import * as I from 'infestines'

export const dep = xs2xsyC => xsy =>
  I.arityN(
    xsy.length,
    I.defineNameU((...xs) => xs2xsyC(...xs)(xsy)(...xs), xsy.name)
  )

export const fn = (xsC, yC) => xsy =>
  I.arityN(
    xsy.length,
    I.defineNameU((...xs) => yC(xsy.apply(null, xsC(xs))), xsy.name)
  )

export const res = yC => fn(I.id, yC)

export const args = xsC => fn(xsC, I.id)

export const nth = (i, xC) => xs => {
  const ys = xs.slice(0)
  ys[i] = xC(ys[i])
  return ys
}

export const par = (i, xC) => args(nth(i, xC))

export const and = (...xCs) => x => {
  for (let i = 0, n = xCs.length; i < n; ++i) x = xCs[i](x)
  return x
}

export const or = (...xCs) => x => {
  let es = null
  for (let i = 0, n = xCs.length; i < n; ++i) {
    try {
      return xCs[i](x)
    } catch (e) {
      es = e
    }
  }
  throw es
}

export const ef = xE =>
  I.defineNameU(x => {
    xE(x)
    return x
  }, xE.name)

export const tup = (...xCs) => xs => {
  if (xs.length !== xCs.length)
    throw Error(
      `Expected array of ${xCs.length} elements, but got ${xs.length}`
    )
  return and.apply(null, xCs.map((xC, i) => nth(i, xC)))(xs)
}

export const arr = xC => xs => xs.map(xC)
