describe("Example component", () => {
    test("Debe ser mayor a 10", () => {
        //Arreglar
        let value = 9;
        //Estimulo
        value += 2;
        //Observar resultado
        expect(value).toBeGreaterThan(10);
    });
});
