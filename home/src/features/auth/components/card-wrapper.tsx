import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import BackButton from "./back-button";
import Social from "./social";
import Header from "./header";


type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: Props) => {
  return (
    <Card className="min-w-[400px] shadow-md border-yellow-100 bg-white">
      <CardHeader className="pb-4">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="pb-6">{children}</CardContent>
      {showSocial && (
        <CardFooter className="border-t border-yellow-100 pt-6">
          <Social />
        </CardFooter>
      )}
      <CardFooter className="border-t border-yellow-100 pt-6">
        <BackButton
            label={backButtonLabel}
            href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;