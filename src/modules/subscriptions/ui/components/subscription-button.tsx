import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "@/components/ui/button";

// ----------------------------------------------------------------------

type SubscriptionButtonProps = {
  onClick: ButtonProps["onClick"];
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: ButtonProps["size"];
};

export function SubscriptionButton({
  onClick,
  disabled,
  isSubscribed,
  className,
  size,
}: SubscriptionButtonProps) {
  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-full", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
