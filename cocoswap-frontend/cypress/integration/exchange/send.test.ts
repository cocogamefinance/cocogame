describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit(
      '/send?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xd2A65E9D9F06B26b04edF099226129Df53B47158',
    )
    cy.url().should(
      'contain',
      '/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xd2A65E9D9F06B26b04edF099226129Df53B47158',
    )
  })
})
