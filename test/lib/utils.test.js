const expect = require('chai').expect
const getPathNames = require('../../src/lib/utils').getPathNames
const parseQueryString = require('../../src/lib/utils').parseQueryString
const getNamedParams = require('../../src/lib/utils').getNamedParams
const nameToPath = require('../../src/lib/utils').nameToPath
const anyEmptyNestedRoutes = require('../../src/lib/utils').anyEmptyNestedRoutes
const extractQueryParams = require('../../src/lib/utils').extractQueryParams

let pathNames = []
let queryParams = {}
let namedParams = []
let routeName = ''
let emptyRoutes

describe('getPathNames', () => {
  describe('Home route', () => {
    beforeEach(() => {
      pathNames = getPathNames('/')
    })

    it('component', () => {
      expect(pathNames.length).to.equal(1)
    })

    it('component', () => {
      expect(pathNames).to.include('/')
    })
  })

  describe('First level route', () => {
    beforeEach(() => {
      pathNames = getPathNames('contact-us')
    })

    it('component', () => {
      expect(pathNames.length).to.equal(1)
    })

    it('component', () => {
      expect(pathNames).to.include('contact-us')
    })
  })

  describe('First level route', () => {
    beforeEach(() => {
      pathNames = getPathNames('/contact-us/')
    })

    it('component', () => {
      expect(pathNames.length).to.equal(1)
    })

    it('component', () => {
      expect(pathNames).to.include('contact-us')
    })
  })

  describe('Two levels route', () => {
    beforeEach(() => {
      pathNames = getPathNames('contact-us/now')
    })

    it('should have 2 items', () => {
      expect(pathNames.length).to.equal(2)
    })

    it('should include route name', () => {
      expect(pathNames).to.include('contact-us')
    })

    it('should include named param', () => {
      expect(pathNames).to.include('now')
    })
  })

  describe('Three levels route', () => {
    beforeEach(() => {
      pathNames = getPathNames('contact-us/now/PLEASE')
    })

    it('should have 2 items', () => {
      expect(pathNames.length).to.equal(3)
    })

    it('should include route name', () => {
      expect(pathNames).to.include('contact-us')
    })

    it('should include named param', () => {
      expect(pathNames).to.include('now')
    })

    it('should include named param', () => {
      expect(pathNames).to.include('PLEASE')
    })
  })

  describe('Route with forward slash', () => {
    beforeEach(() => {
      pathNames = getPathNames('/contact-us/please')
    })

    it('should return one element', () => {
      expect(pathNames.length).to.equal(2)
    })

    it('should include the name', () => {
      expect(pathNames).to.include('contact-us')
    })

    it('should include the name', () => {
      expect(pathNames).to.include('please')
    })
  })
})

describe('parseQueryString', () => {
  describe('When is empty', () => {
    beforeEach(() => {
      queryParams = parseQueryString()
    })

    it('should return an empty object', () => {
      expect(queryParams).to.deep.equal({})
    })
  })

  describe('When is empty', () => {
    beforeEach(() => {
      queryParams = parseQueryString('/empty/route')
    })

    it('should return an empty object', () => {
      expect(queryParams).to.deep.equal({})
    })
  })

  describe('When there is one param', () => {
    beforeEach(() => {
      queryParams = parseQueryString('/route/with/params?name=value')
    })

    it('should return an object', () => {
      expect(queryParams).to.deep.equal({ name: 'value' })
    })
  })

  describe('When there are more than one param', () => {
    beforeEach(() => {
      queryParams = parseQueryString('/route/with/params?name=value&name2=2019-10-10')
    })

    it('should return an object', () => {
      expect(queryParams).to.deep.equal({ name: 'value', name2: '2019-10-10' })
    })
  })
})

describe('When only query params are present', () => {
  beforeEach(() => {
    queryParams = parseQueryString('?name=value&name2=2019-10-10')
  })

  it('should return an object', () => {
    expect(queryParams).to.deep.equal({ name: 'value', name2: '2019-10-10' })
  })
})

describe('getNamedParams', () => {
  describe('When there are no named params', () => {
    beforeEach(() => {
      namedParams = getNamedParams()
    })

    it('should return an empty object', () => {
      expect(namedParams).to.deep.equal([])
    })
  })

  describe('When there is one named param', () => {
    beforeEach(() => {
      namedParams = getNamedParams('/employee/:id')
    })

    it('should return one param', () => {
      expect(namedParams.length).to.equal(1)
    })

    it('should return the param name', () => {
      expect(namedParams).to.deep.equal(['id'])
    })
  })

  describe('When there are many params', () => {
    beforeEach(() => {
      namedParams = getNamedParams('/project/show/:name/:date/:id')
    })

    it('should return one param', () => {
      expect(namedParams.length).to.equal(3)
    })

    it('should return the param name', () => {
      expect(namedParams).to.deep.equal(['name', 'date', 'id'])
    })
  })
})

describe('nameToPath', () => {
  describe('When is empty', () => {
    beforeEach(() => {
      routeName = nameToPath()
    })

    it('component', () => {
      expect(routeName).to.equal('')
    })
  })

  describe('When is the root path', () => {
    beforeEach(() => {
      routeName = nameToPath('/')
    })

    it('component', () => {
      expect(routeName).to.equal('/')
    })
  })

  describe('When param has named params with it', () => {
    beforeEach(() => {
      routeName = nameToPath('employee/:id')
    })

    it('should return the name', () => {
      expect(routeName).to.equal('employee')
    })
  })

  describe('When param has one value', () => {
    beforeEach(() => {
      routeName = nameToPath('projects')
    })

    it('should return the name', () => {
      expect(routeName).to.equal('projects')
    })
  })

  describe('When param has uppercase letters', () => {
    beforeEach(() => {
      routeName = nameToPath('proJECTS')
    })

    it('should return the name', () => {
      expect(routeName).to.equal('projects')
    })
  })

  describe('When param has named params with it', () => {
    beforeEach(() => {
      routeName = nameToPath('employee/:id')
    })

    it('should return the name', () => {
      expect(routeName).to.equal('employee')
    })
  })
})

describe('anyEmptyNestedRoute', () => {
  describe('when there are no empty nested routes', () => {
    beforeEach(() => {
      emptyRoutes = anyEmptyNestedRoutes({
        name: 'bla',
        nestedRoutes: [{ name: 'foo', nestedRoutes: [{ name: 'pink' }] }]
      })
    })

    it('should return false', () => {
      expect(emptyRoutes).to.be.false
    })
  })

  describe('when there are empty nested routes', () => {
    beforeEach(() => {
      emptyRoutes = anyEmptyNestedRoutes({ name: 'bla', nestedRoutes: [{ name: 'foo', nestedRoutes: [] }] })
    })

    it('should return true', () => {
      expect(emptyRoutes).to.be.true
    })
  })
})

describe('extractQueryParams', () => {
  describe('when there are query params', () => {
    beforeEach(() => {
      emptyRoutes = extractQueryParams('/route/with/params/?name=rock&other=value')
    })

    it('should return the route part', () => {
      expect(emptyRoutes[0]).to.equal('/route/with/params')
    })

    it('should return the query params as an object', () => {
      expect(emptyRoutes[1]).to.deep.equal({ name: 'rock', other: 'value' })
    })
  })

  describe('when there are no query params', () => {
    beforeEach(() => {
      emptyRoutes = extractQueryParams('/route')
    })

    it('should return the route part', () => {
      expect(emptyRoutes[0]).to.equal('/route')
    })

    it('should return the query params as an object', () => {
      expect(emptyRoutes[1]).to.deep.equal({})
    })
  })
})
