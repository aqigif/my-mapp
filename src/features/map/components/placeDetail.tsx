import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Link, Rating } from "@mui/material";
import { GOOGLE_IMAGE_STATIC } from "../mapService";
import { PlaceDetailsType } from "../types/placeTypes";

const PlaceDetail = ({ data }: { data: PlaceDetailsType }) => {
  return (
    <div className="mt-4 w-full flex flex-col">
      {data.photos?.[0]?.photo_reference && (
        <img
          src={GOOGLE_IMAGE_STATIC + data.photos?.[0]?.photo_reference}
          alt="alt"
          className="h-[250px] w-full object-cover rounded"
        />
      )}
      <h5 className="font-bold mt-2">{data.name}</h5>
      <p>{data.formatted_address}</p>
      {data.rating && (
        <div className="mt-2">
          <Rating
            name="half-rating"
            value={data.rating}
            precision={0.5}
            readOnly
          />
        </div>
      )}
      {data.website && <Link href={data.website}>{data.website}</Link>}
      <div className="mt-2">
        <Button variant="outlined" onClick={() => window.open(data.url)}>
          <OpenInNewIcon />
          Open more in GMAP
        </Button>
      </div>
    </div>
  );
};

export default PlaceDetail;
