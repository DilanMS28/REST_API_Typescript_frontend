
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC"
    }).format(amount);
}