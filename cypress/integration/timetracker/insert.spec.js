

context('Connect Time-Tracker', () => {
    it('Open and insert time', () => {
        //TODO refactor extract method
        const domainTimeTracker = 'http://172.16.100.81/timetracker/'
        let urlTimeTracker = domainTimeTracker + "/login.php"

        //TODO pass parameter date
        let urlTimePath = domainTimeTracker + "/time.php?date="
        const username = "nopadon"
        const password = ""

        cy.visit(urlTimeTracker)


        // login
        cy.get('#login').type(username)
        cy.get('#password').type(password)
        cy.get('#btn_login').click()

        // go to date 
        cy.fixture('data.csv').then(item => {
            let csvModel = []
            let readCSVData = item.split("\n")
            readCSVData.forEach(element => {
                csvModel.push(element.split(','))
            });
            console.log('csvModel', csvModel)

            let loopNumber = 1
            csvModel.forEach(element => {
                cy.visit(urlTimePath + element[0])
                // fil-in data
                cy.get('#project').select(element[1])
                cy.get('#duration').type(element[2])
                cy.get('#note').type(element[3])
                cy.get('#btn_submit').click()
                cy.log('Loop insert number : ' + loopNumber++)
            })
        })
    })
})