import { shallowMount, mount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";
describe("Pruebas en componente Indecision", () => {
    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    answer: "yes",
                    forced: false,
                    image: "https://yesno.wtf/assets/yes/2.gif",
                }),
        })
    );

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, "log");
        jest.clearAllMocks();
    });
    test("match con snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("escribir en input no debe disparar nada ", async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

        const valor = "Hola mundo";
        const input = wrapper.find("input");
        await input.setValue(valor);

        expect(clgSpy).toHaveBeenCalledTimes(1);

        expect(getAnswerSpy).not.toHaveBeenCalled();
    });
    test("escribir simbolo `?` debe disparar el fetch", async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

        const valor = "Hola mundo?";
        const input = wrapper.find("input");
        await input.setValue(valor);

        expect(clgSpy).toHaveBeenCalledTimes(1);

        expect(getAnswerSpy).toHaveBeenCalled();
    });
    test("pruebas en getAnswer", async () => {
        await wrapper.vm.getAnswer();
        const img = wrapper.find("img");

        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
        expect(wrapper.vm.answer).toBe("Si");
    });
    test("pruebas en getAnswer - fallo en API", async () => {
        fetch.mockImplementationOnce(() => Promise.reject("Api failed"));
        await wrapper.vm.getAnswer();


        const img = wrapper.find("img");
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe("No se pudo cargar del API");
    });
});
