import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter Component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });

    test("Debe hacer match con el snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
    test("Debe renderizar etiqueta h2 con valor por defecto Counter", () => {
        expect(wrapper.find("h2").exists()).toBeTruthy();

        const h2 = wrapper.find("h2").text();

        expect(h2).toBe("Counter");
    });
    test("Debe incrementar contador", async () => {
        const increaseBtn = wrapper.find("button");

        await increaseBtn.trigger("click");

        const value = wrapper.find("p").text();

        expect(value).toBe("1");
    });
    test("Debe decrementar contador 2 veces", async () => {
        const increaseBtn = wrapper.findAll("button")[1];

        await increaseBtn.trigger("click");
        await increaseBtn.trigger("click");

        const value = wrapper.find("p").text();

        expect(value).toBe("-2");
    });
    test("Debe establecer valor por defecto", () => {
        const start = wrapper.props("start");

        const value = wrapper.find("p").text();

        expect(Number(value)).toBe(start);
    });
    test("Debe mostrar la prop title", () => {
        const title = "Contador";
        const wrapper = shallowMount(Counter, { props: { title } });
        const value = wrapper.find("h2").text();

        expect(value).toBe(title);
    });
});
