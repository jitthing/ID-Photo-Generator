package IS442.G1T3.IDPhotoGenerator.repository;

import IS442.G1T3.IDPhotoGenerator.model.ImageNewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageNewRepository extends JpaRepository<ImageNewEntity, String> {

    // Find a single image by currentImageUrl (if needed)
    ImageNewEntity findByCurrentImageUrl(String currentImageUrl);

    // Find all images by userId
    List<ImageNewEntity> findByUserId(UUID userId);

    // Find latest row by image id
    @Query("SELECT i FROM ImageNewEntity i WHERE i.imageId = :imageId AND i.version = " +
            "(SELECT MAX(i2.version) FROM ImageNewEntity i2 WHERE i2.imageId = :imageId)")
    ImageNewEntity findLatestRowByImageId(@Param("imageId") UUID imageId);
}

