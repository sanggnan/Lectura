import { useRef, useState, useCallback } from 'react'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export function useFaceDetection() {
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [modelError, setModelError] = useState(null)
  const landmarkerRef = useRef(null)

  const loadModels = useCallback(async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      )
      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate: 'GPU',
        },
        outputFaceBlendshapes: true,
        runningMode: 'VIDEO',
        numFaces: 1,
      })
      setModelsLoaded(true)
    } catch (err) {
      setModelError(err.message)
    }
  }, [])

  const detectExpression = useCallback((videoEl) => {
    if (!videoEl || !modelsLoaded || !landmarkerRef.current) return null
    try {
      return landmarkerRef.current.detectForVideo(videoEl, performance.now())
    } catch { return null }
  }, [modelsLoaded])

  const getScore = (bs, name) => bs.find(b => b.categoryName === name)?.score ?? 0

  const classifyResult = useCallback((result) => {
    if (!result?.faceBlendshapes?.length) return 'noface'
    const bs = result.faceBlendshapes[0].categories
    const browDown = (getScore(bs,'browDownLeft') + getScore(bs,'browDownRight')) / 2
    const browInnerUp = getScore(bs,'browInnerUp')
    const eyeSquint = (getScore(bs,'eyeSquintLeft') + getScore(bs,'eyeSquintRight')) / 2
    const mouthFrown = (getScore(bs,'mouthFrownLeft') + getScore(bs,'mouthFrownRight')) / 2
    const noseSneer = (getScore(bs,'noseSneerLeft') + getScore(bs,'noseSneerRight')) / 2
    const mouthSmile = (getScore(bs,'mouthSmileLeft') + getScore(bs,'mouthSmileRight')) / 2
    const cheekSquint = (getScore(bs,'cheekSquintLeft') + getScore(bs,'cheekSquintRight')) / 2
    const browOuterUp = (getScore(bs,'browOuterUpLeft') + getScore(bs,'browOuterUpRight')) / 2
    const confusionScore = browDown*0.30 + browInnerUp*0.20 + eyeSquint*0.15 + mouthFrown*0.15 + noseSneer*0.20
    const understandingScore = mouthSmile*0.45 + cheekSquint*0.25 + browOuterUp*0.30
    if (understandingScore > 0.15 && understandingScore > confusionScore * 1.5) return 'understanding'
    if (confusionScore > 0.12) return 'confused'
    return 'neutral'
  }, [])

  return { modelsLoaded, modelError, loadModels, detectExpression, classifyResult }
}
