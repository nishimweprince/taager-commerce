import { Heading } from '../common/TextInputs';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  setQuantity,
}: QuantitySelectorProps) => (
  <section className="flex flex-col gap-3 border-t border-border pt-4">
    <Heading type="h3">Quantity</Heading>
    <fieldset className="flex items-center gap-4">
      <section className="flex items-center border rounded-md">
        <button
          className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-muted"
          aria-label="Decrease quantity"
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        >
          -
        </button>
        <output className="w-10 h-10 flex items-center justify-center">
          {quantity}
        </output>
        <button
          className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-muted"
          aria-label="Increase quantity"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </section>
      <span className="text-sm text-muted-foreground">Available: In Stock</span>
    </fieldset>
  </section>
);
