import { useMemo, useState } from "react";
import Button from "../common/Button";

function initialSelection(options) {
    const state ={};
    for (const group of options) {
        state[group.id] = group.type === "single" ? [group.choices[0].id] : [];
    }
    return state;
}

export default function CustomizeModal({ product, onClose, onConfirm }) {
    const [selection, setSelection] = useState(() => initialSelection(product.options));

    function toggleChoice(group, choiceId) {
        setSelection((prev) => {
            if (group.type === "single") {
                return { ...prev, [group.id]: [choiceId] };
            }
            const current = prev[group.id];
            const next = current.includes(choiceId)
                ? current.filter((id) => id !== choiceId)
                : [...current, choiceId];
            return { ...prev, [group.id]: next};
        });
    }

    const selectedOptions = useMemo(() => {
        return product.options.map((group) => {
            const choiceids = selection[group.id] ?? [];
            const choices = group.choices.filter((c) => choiceids.includes(c.id));
            return {
                groupId: group.id,
                groupLabel: group.label,
                choiceids,
                choiceLabels: choices.map((c) => c.label),
                priceDelta: choices.reduce((sum, c) => sum + c.priceDelta, 0),
            };
        });
    }, [selection, product.options]);

    const total =
    product.price + selectedOptions.reduce((sum, o) => sum + o.priceDelta, 0);

    return (
        <div className = "fixed inset-0 z-50 flex items-end justify-center bg-espresso-950/40 p-0 sm:items-center sm:p-4">
            <div
            className = "absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
            />
            <div className = "relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className = "font-display text-xl text-espresso-900">{product.name}</h2>
                        <p classname="mt-1 text-sm text-espresso-700/70">{product.description}</p>
                    </div>
                    <button onClick = {onClose} aria-label="Close" className="p-1 text-espresso-700 hover:text-clay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <div className = "mt-6 space-y-6">
                    {product.options.map((group) => (
                        <fieldset key={group.id}>
                            <legend classname = "mb-2 text-sm font-semibold text-espresso-900">
                                {group.label}
                                {group.type === "multi" && (
                                    <span className="ml-1 font-normal text-espresso-700/60">{optional}</span>
                                )}
                            </legend>
                            <div className = "flex flex-wrap gap-2">
                                {group.choices.map((choice) => {
                                    const active = selection[group.id]?.includes(choice.id);
                                    return (
                                        <button
                                            key={choice.id}
                                            type="button"
                                            onClick={() => toggleChoice(group, choice.id)}
                                            className = {`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                                active
                                                ? "border-clay bg-clay text-cream"
                                                : "border-espresso-8000/20 text-espresso-800 hover:bg-latte-200"
                                            }`}
                                            >
                                                {choice.label}
                                                {choice.PriceDelta > 0 && (
                                                    <span className = "ml-1 opacity-80">
                                                        + RWF{choice.priceDelta.toFixed(0)}
                                                    </span>
                                                )}
                                            </button>
                                    );
                                })}
                            </div>
                        </fieldset>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <span className = "text-lg font-semibold text-espresso-900">
                        RWF{total.toFixed(0)}
                    </span>
                    <Button
                    onClick = {() => {
                        onConfirm(selectedOptions);
                        onCLose();
                    }}
                    >
                        Add to Order
                    </Button>
                </div>
            </div>
        </div>
    );
}