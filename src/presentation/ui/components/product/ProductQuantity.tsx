import { useMemo } from 'react';
import { Heading } from '../inputs/TextInputs';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  maxQuantity?: number;
}

export const QuantitySelector = ({
  quantity,
  setQuantity,
  maxQuantity,
}: QuantitySelectorProps) => {
  /**
   * STATE VARIABLES
   */
  const decreaseQuantityIsDisabled = useMemo(() => {
    if (maxQuantity) {
      return quantity <= 1;
    }
    return false;
  }, [quantity, maxQuantity]);

  const increaseQuantityIsDisabled = useMemo(() => {
    if (maxQuantity) {
      return quantity >= maxQuantity;
    }
    return false;
  }, [quantity, maxQuantity]);

  /**
   * RENDER
   */

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-4">
      <Heading type="h3">Quantity</Heading>
      <fieldset className="flex items-center gap-4">
        <section className="flex items-center border rounded-md">
          <button
            className={`w-10 h-10 flex items-center justify-center hover:bg-muted ${
              decreaseQuantityIsDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            aria-label="Decrease quantity"
            onClick={(e) => {
              e.preventDefault();
              setQuantity(quantity - 1);
            }}
            disabled={decreaseQuantityIsDisabled}
          >
            -
          </button>
          <output className="w-10 h-10 flex items-center justify-center">
            {quantity}
          </output>
          <button
            className={`w-10 h-10 flex items-center justify-center hover:bg-muted ${
              increaseQuantityIsDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            aria-label="Increase quantity"
            onClick={(e) => {
              e.preventDefault();
              setQuantity(quantity + 1);
            }}
            disabled={increaseQuantityIsDisabled}
          >
            +
          </button>
        </section>
        <span className="text-sm text-muted-foreground">
          Available: In Stock
        </span>
      </fieldset>
    </section>
  );
};
